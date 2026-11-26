import { copyFile, mkdir } from 'node:fs/promises'

// The repository owns its logo and documented screenshots in a single place.
const root = new URL('../../', import.meta.url)
const output = new URL('../docs/public/', import.meta.url)
await copyFile(new URL('icon.svg', root), new URL('icon.svg', output))
await mkdir(new URL('screens/', output), { recursive: true })
for (const name of ['web-task.png', 'web-trace.png']) {
  await copyFile(new URL('docs/images/' + name, root), new URL('screens/' + name, output))
}
