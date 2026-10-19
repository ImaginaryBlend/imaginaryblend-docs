import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/imaginaryblend-docs/',
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
      { text: 'Release notes 3.0', link: '/release-notes-3-0' }
    ],
    sidebar: [
      {
        text: 'Fluid Flux Documentation',
        items: [
          {
            text: 'Introduction',
            link: '/introduction',
            collapsed: false,
            items: [
              { text: 'Installation', link: '/introduction#installation' },
              { text: 'Substrate compatibility', link: '/introduction#substrate-compatibility' },
              { text: 'Project structure', link: '/introduction#project-structure' },
              { text: 'Reporting Bugs', link: '/introduction#reporting-bugs' }
            ]
          },
          {
            text: 'Player character',
            link: '/player-character',
            collapsed: false,
            items: [
              { text: 'Swimming component', link: '/player-character#swimming-component' },
              { text: 'Vehicle driver', link: '/player-character#vehicle-driver' },
              { text: 'Buoyancy component', link: '/player-character#buoyancy-component' }
            ]
          },
          {
            text: 'Surface actor',
            link: '/surface-actor',
            collapsed: false,
            items: [
              { text: 'Interaction system', link: '/surface-actor#interaction-system' },
              { text: 'Color presets', link: '/surface-actor#color-presets' },
              { text: 'World painter and brush', link: '/surface-actor#world-painter-and-brush' },
              { text: 'Reading fluid data', link: '/surface-actor#reading-fluid-data' },
              { text: 'Niagara integration', link: '/surface-actor#niagara-integration' },
              { text: 'Translucency', link: '/surface-actor#translucency' },
              { text: 'Cut the mask and holes', link: '/surface-actor#cut-the-mask-and-holes' }
            ]
          },
          {
            text: 'Domain actors',
            collapsed: false,
            items: [
              {
                text: 'Ground capture',
                link: '/ground-capture',
                collapsed: false,
                items: [
                  { text: 'Visibility options', link: '/ground-capture#visibility-options' },
                  { text: 'Solving issues', link: '/ground-capture#solving-issues' }
                ]
              },
              {
                text: 'Simulation Domain',
                link: '/simulation-domain',
                collapsed: false,
                items: [
                  { text: 'Modifier Component', link: '/simulation-domain#modifier-component' },
                  { text: 'Modifier Container', link: '/simulation-domain#modifier-container' },
                  { text: 'Solving issues', link: '/simulation-domain#solving-issues' },
                  { text: 'Fluid state', link: '/simulation-domain#fluid-state' },
                  { text: 'Dynamic ground', link: '/simulation-domain#dynamic-ground' },
                  { text: 'Mesh generator', link: '/simulation-domain#mesh-generator' },
                  { text: 'Recreating Ocean', link: '/simulation-domain#recreating-ocean' },
                  { text: 'Sequencer', link: '/simulation-domain#sequencer' }
                ]
              },
              {
                text: 'Coastline Domain',
                link: '/coastline-domain',
                collapsed: false,
                items: [
                  { text: 'Coastline state', link: '/coastline-domain#coastline-state' },
                  { text: 'Solving Issues', link: '/coastline-domain#solving-issues' }
                ]
              }
            ]
          },
          {
            text: 'Glass system',
            link: '/glass-system',
            collapsed: false,
            items: [
              { text: 'Masking surface', link: '/glass-system#masking-surface' },
              { text: 'Glass rendering', link: '/glass-system#glass-rendering' }
            ]
          }
        ]
      },
      {
        text: 'Release notes and installation',
        items: [
          { text: 'Fluid Flux 3.0 Release Notes', link: '/release-notes-3-0' },
          { text: 'Package Installation Process', link: '/installation-process' }
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
      pattern: 'https://github.com/ImaginaryBlend/imaginaryblend-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    footer: {
      message: 'Contact: <a href="mailto:imaginaryblend@gmail.com">imaginaryblend@gmail.com</a>',
      copyright: 'Copyright © Imaginary Blend - Krystian Komisarek'
    }
  }
})
