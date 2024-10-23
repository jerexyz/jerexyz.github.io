import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端碎片",
  description: "前端碎片",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archive' }
    ],

    sidebar: [
      {
        text: '归档1',
        items: [
          { text: '「微信小程序」开发问题汇总', link: '/archive/weapp-tips' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/jerexyz' }
    ]
  }
})
