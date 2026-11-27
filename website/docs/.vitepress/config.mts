import { defineConfig, type DefaultTheme } from 'vitepress'
import words from './navigation.json' with { type: 'json' }
import { searchLocales } from './search-locales.ts'

const languages = { en: 'English', zh: '简体中文', de: 'Deutsch', es: 'Español', fr: 'Français', ja: '日本語', pt: 'Português', ru: 'Русский' }
const sections = { intro: 'guide/chat', setup: 'guide/start', modelMetadata: 'guide/model-metadata', im: 'guide/im', arch: 'develop/layers', models: 'develop/models', mesh: 'develop/mesh', api: 'develop/api' }
type Locale = keyof typeof languages

function locale(code: Locale) {
  const title = words[code]
  const base = code === 'en' ? '/' : `/${code}/`
  const page = (key: keyof typeof sections) => ({ text: title[key], link: base + sections[key] })
  const groups = [
    { text: title.guide, items: [page('setup'), page('modelMetadata'), page('intro'), page('im')] },
    { text: title.develop, items: [page('arch'), page('models'), page('mesh'), page('api')] },
  ]
  return {
    label: languages[code], lang: code === 'zh' ? 'zh-CN' : code,
    link: base,
    themeConfig: {
      nav: [{text: title.guide, link: base + 'guide/start', activeMatch: '^' + base + 'guide/'}, {text: title.develop, link: base + 'develop/layers', activeMatch: '^' + base + 'develop/'}],
      sidebar: groups,
      outline: { label: title.outline },
      docFooter: {prev: title.prev, next: title.next},
      langMenuLabel: title.lang, sidebarMenuLabel: title.menu, returnToTopLabel: title.top, darkModeSwitchLabel: title.appearance,
    } satisfies DefaultTheme.Config,
  }
}

const locales = Object.fromEntries((Object.keys(languages) as Locale[]).map(code => [code === 'en' ? 'root' : code, locale(code)]))

export default defineConfig({
  title: 'DSH Prism',
  description: 'Documentation for Prism, a distributed orchestration system for DeepSeek Harness.',
  lang: 'en', base: '/', cleanUrls: true, locales,
  head: [['link', {rel: 'icon', type: 'image/svg+xml', href: '/icon.svg'}], ['meta', {name: 'theme-color', content: '#176347'}]],
  sitemap: { hostname: 'https://prism.dsh-plug.in' },
  themeConfig: {
    logo: {src: '/icon.svg', alt: 'Prism'},
    socialLinks: [{icon: 'github', link: 'https://github.com/dsh-plugins/dsh-prism', ariaLabel: 'DSH Prism · GitHub'}],
    search: { provider: 'local', options: { locales: searchLocales } },
  },
})
