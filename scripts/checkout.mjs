import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const runtime = join(root, 'runtime')
const revisions = JSON.parse(readFileSync(join(root, 'plugins.lock.json'), 'utf8'))
const plugins = ['dsh-orchestrator', 'dsh-concierge-ui', 'dsh-workspace-registry', 'dsh-mesh-node', 'dsh-im-gateway']
const git = (cwd, ...args) => execFileSync('git', args, { cwd, stdio: ['inherit', 'pipe', 'inherit'], maxBuffer: 16 * 1024 * 1024 })
for (const plugin of plugins) {
  if (!/^[a-f0-9]{40}$/.test(revisions[plugin])) throw new Error('Invalid plugin revision for ' + plugin)
}

if (existsSync(runtime)) {
  for (const plugin of plugins) {
    const path = join(runtime, plugin)
    if (!existsSync(join(path, '.git')) || git(path, 'rev-parse', 'HEAD').toString().trim() !== revisions[plugin]) {
      throw new Error('runtime already exists with different sources. Save any local work and move the directory aside before retrying.')
    }
  }
  console.log('The pinned runtime already exists. Continue in runtime/.')
} else {
  const stage = mkdtempSync(join(root, '.checkout-'))
  try {
    for (const plugin of plugins) {
      const path = join(stage, plugin)
      git(stage, 'clone', '--no-checkout', 'https://github.com/dsh-plugins/' + plugin + '.git', path)
      git(path, 'checkout', '--detach', revisions[plugin])
    }
    // Read binary-safe blobs from the pinned release, keeping private implementation in the local checkout.
    const orchestrator = join(stage, 'dsh-orchestrator')
    const tree = revisions['dsh-orchestrator'] + ':integration/workspace'
    const files = git(orchestrator, 'ls-tree', '-rz', '--name-only', tree).toString().split('\0').filter(Boolean)
    if (!files.includes('package-lock.json') || !files.includes('scripts/prism.mjs')) throw new Error('Incomplete workspace snapshot')
    for (const name of files) {
      if (!name.split('/').every(part => /^[\w.-]+$/.test(part) && part !== '..' && part !== '.')) throw new Error('Invalid snapshot path')
      const destination = join(stage, name)
      mkdirSync(dirname(destination), { recursive: true })
      writeFileSync(destination, git(orchestrator, 'show', tree + '/' + name), { flag: 'wx' })
    }
    renameSync(stage, runtime)
    console.log('Workspace ready. Run cd runtime, npm ci, npm run build, then npm start.')
  } finally {
    rmSync(stage, { recursive: true, force: true })
  }
}
