import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/fluid-flux-docs/',
  lang: 'en-US',
  title: 'Fluid Flux Documentation',
  description:
    'Fluid Flux is a powerful water system based on 2D shallow-water fluid simulations for Unreal Engine.',
  themeConfig: {
    search: { provider: 'local' },
    outline: [2, 3],
    nav: [
      { text: 'Documentation', link: '/introduction' },
      { text: 'Download', link: 'https://www.fab.com/listings/196c70cd-1283-4249-bf6b-c3019d1cbe11' },
      { text: 'Forum', link: 'https://discord.gg/rG2q3SB5EB' },
      { text: 'Release notes 3.0', link: 'https://imaginaryblend.com/2024/11/21/fluid-flux-3-0-release-notes/' },
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
      { icon: 'facebook', link: 'https://www.facebook.com/ImaginaryBlend-2124619937750328/' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 7h2v6a2 2 0 0 0 4 0V7h2v6a4 4 0 0 1-8 0V7z"/></svg>'
        },
        link: 'https://www.unrealengine.com/marketplace/profile/Krystian+Komisarek',
        ariaLabel: 'Unreal Engine Marketplace profile'
      }
    ],
    editLink: {
      pattern: 'https://github.com/grackomi-sys/fluid-flux-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Contact: <a href="mailto:imaginaryblend@gmail.com">imaginaryblend@gmail.com</a>',
      copyright: 'Copyright © Imaginary Blend - Krystian Komisarek'
    }
  }
})
