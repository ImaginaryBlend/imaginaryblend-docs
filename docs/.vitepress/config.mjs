import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/fluid-flux-docs/',
  lang: 'en-US',
  title: 'Fluid Flux Documentation',
  description:
    'Fluid Flux is a powerful water system based on 2D shallow-water fluid simulations for Unreal Engine.',
  lastUpdated: false,
  themeConfig: {
    search: { provider: 'local' },
    outline: [2, 3],
    nav: [
      { text: 'Documentation', link: '/introduction' },
      { text: 'Download', link: 'https://www.fab.com/listings/196c70cd-1283-4249-bf6b-c3019d1cbe11' },
      { text: 'Forum', link: 'https://discord.gg/rG2q3SB5EB' },
      { text: 'Imaginary Blend', link: 'https://imaginaryblend.com/' }
    ],
    sidebar: [
      {
        text: 'Fluid Flux Documentation',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Player character', link: '/player-character' },
          { text: 'Surface actor', link: '/surface-actor' },
          {
            text: 'Domain actors',
            items: [
              { text: 'Ground capture', link: '/ground-capture' },
              { text: 'Simulation Domain', link: '/simulation-domain' },
              { text: 'Coastline Domain', link: '/coastline-domain' }
            ]
          },
          { text: 'Glass system', link: '/glass-system' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCtA9XJo3PIV0Cij5ZTcHr_Q' },
      { icon: 'facebook', link: 'https://www.facebook.com/ImaginaryBlend-2124619937750328/' }
    ],
    editLink: {
      pattern: 'https://github.com/grackomi-sys/fluid-flux-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Contact: imaginaryblend@gmail.com',
      copyright: 'Copyright © Imaginary Blend - Krystian Komisarek'
    }
  }
})
