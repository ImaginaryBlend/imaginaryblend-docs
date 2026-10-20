import { defineConfig } from 'vitepress'

const FAB = 'https://www.fab.com/listings/196c70cd-1283-4249-bf6b-c3019d1cbe11'

const SIDEBAR_FLUIDFLUX = [
  {
    // same style as Documentation: one list of collapsible sections
    items: [
      {
        text: 'Product',
        collapsed: true,
        items: [
          { text: 'Features', link: '/' },
          { text: 'Showcase', link: '/showcase/' }
        ]
      },
      {
        text: 'Requirements',
        collapsed: true,
        items: [
          { text: 'Limitations', link: '/introduction/limitations' },
          { text: 'Performance', link: '/introduction/performance' },
          {
            text: 'Compatibility',
            collapsed: true,
            items: [
              { text: 'Substrate', link: '/compatibility/substrate' },
              { text: 'Multiplayer', link: '/compatibility/multiplayer' },
              { text: 'Open world', link: '/compatibility/open-world' },
              { text: 'Platforms', link: '/compatibility/platforms' },
              { text: 'Third-party plugins', link: '/compatibility/plugins' }
            ]
          }
        ]
      },
      {
        text: 'Purchase',
        collapsed: true,
        items: [
          { text: 'License', link: '/support/license' },
          { text: 'Refund Policy', link: '/support/refund-policy' }
        ]
      },
      {
        text: 'Updates',
        collapsed: true,
        items: [
          { text: 'Roadmap', link: '/release-notes/' },
          { text: 'Fluid Flux 3.0', link: '/release-notes/3-0' },
          { text: 'Fluid Flux 2.0', link: '/release-notes/2-0' },
          { text: 'Fluid Flux 1.1', link: '/release-notes/1-1' }
        ]
      },
      {
        text: 'Help',
        collapsed: true,
        items: [
          { text: 'Questions & Answers', link: '/introduction/faq' },
          { text: 'Support', link: '/support/' },
          { text: 'Reporting bugs', link: '/support/reporting-bugs' }
        ]
      }
    ]
  }
]

const SIDEBAR_DOCUMENTATION = [
  {
    // no group title – the top menu already shows we are in Documentation
    items: [
      {
        text: 'Getting started',
        collapsed: true,
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Project settings', link: '/getting-started/project-settings' },
          { text: 'Updating process', link: '/getting-started/updating' },
          { text: 'Tutorials', link: '/getting-started/tutorials' }
        ]
      },
      {
        text: 'Core systems',
        collapsed: true,
        items: [
          { text: 'Project structure', link: '/guide/project-structure' },
          {
            text: 'Player character',
            link: '/guide/player-character',
            collapsed: true,
            items: [
              { text: 'Swimming component', link: '/guide/player-character#swimming-component' },
              { text: 'Vehicle driver', link: '/guide/player-character#vehicle-driver' }
            ]
          },
          {
            text: 'Buoyancy',
            link: '/guide/buoyancy',
            collapsed: true,
            items: [
              { text: 'Limitations', link: '/guide/buoyancy#limitations' },
              { text: 'Adding a buoyancy system', link: '/guide/buoyancy#adding-a-buoyancy-system-to-the-actor' },
              { text: 'Using FluxBuoyancyEditor', link: '/guide/buoyancy#using-fluxbuoyancyeditor' },
              { text: 'Good practices', link: '/guide/buoyancy#good-practices-and-solving-problems' }
            ]
          },
          {
            text: 'Surface actor',
            link: '/guide/surface-actor',
            collapsed: true,
            items: [
              { text: 'Color presets', link: '/guide/surface-actor#color-presets' },
              { text: 'World painter and brush', link: '/guide/surface-actor#world-painter-and-brush' },
              { text: 'Reading fluid data', link: '/guide/surface-actor#reading-fluid-data' },
              { text: 'Niagara integration', link: '/guide/surface-actor#niagara-integration' },
              { text: 'Translucency', link: '/guide/surface-actor#translucency' },
              { text: 'Cut the mask and holes', link: '/guide/surface-actor#cut-the-mask-and-holes' }
            ]
          },
          {
            text: 'Interactions',
            link: '/guide/interactions',
            collapsed: true,
            items: [
              { text: 'Setting up interactions', link: '/guide/interactions#setting-up-interactions' },
              { text: 'Splashes', link: '/guide/interactions#splashes' }
            ]
          },
          {
            text: 'Ground capture',
            link: '/guide/ground-capture',
            collapsed: true,
            items: [
              { text: 'Visibility options', link: '/guide/ground-capture#visibility-options' },
              { text: 'Solving issues', link: '/guide/ground-capture#solving-issues' }
            ]
          },
          {
            text: 'Simulation Domain',
            link: '/guide/simulation-domain',
            collapsed: true,
            items: [
              { text: 'Modifier Component', link: '/guide/simulation-domain#modifier-component' },
              { text: 'Modifier Container', link: '/guide/simulation-domain#modifier-container' },
              { text: 'Solving issues', link: '/guide/simulation-domain#solving-issues' },
              { text: 'Fluid state', link: '/guide/simulation-domain#fluid-state' },
              { text: 'Dynamic ground', link: '/guide/simulation-domain#dynamic-ground' },
              { text: 'Mesh generator', link: '/guide/simulation-domain#mesh-generator' },
              { text: 'Recreating Ocean', link: '/guide/simulation-domain#recreating-ocean' },
              { text: 'Sequencer', link: '/guide/simulation-domain#sequencer' }
            ]
          },
          {
            text: 'Coastline Domain',
            link: '/guide/coastline-domain',
            collapsed: true,
            items: [
              { text: 'Coastline state', link: '/guide/coastline-domain#coastline-state' },
              { text: 'Solving Issues', link: '/guide/coastline-domain#solving-issues' }
            ]
          },
          {
            text: 'Glass system',
            link: '/guide/glass-system',
            collapsed: true,
            items: [
              { text: 'Examples', link: '/guide/glass-system#examples' },
              { text: 'Masking surface', link: '/guide/glass-system#masking-surface' },
              { text: 'Glass rendering', link: '/guide/glass-system#glass-rendering' }
            ]
          }
        ]
      }
    ]
  }
]

export default defineConfig({
  base: '/imaginaryblend-docs/',
  lang: 'en-US',
  title: 'Fluid Flux',
  description:
    'Fluid Flux is a real-time water system for Unreal Engine, built on 2D shallow-water simulation – from interactive rivers and floods to coastlines and open oceans.',
  cleanUrls: true,
  head: [['link', { rel: 'icon', type: 'image/png', href: '/imaginaryblend-docs/logo.png' }]],
  themeConfig: {
    logo: { src: '/logo.png', alt: 'Fluid Flux' },
    search: { provider: 'local' },
    outline: [2, 3],
    nav: [
      { text: 'Documentation', link: '/getting-started/installation', activeMatch: '^/(getting-started|guide)/' },
      { text: 'Download', link: FAB }
    ],
    sidebar: {
      '/getting-started/': SIDEBAR_DOCUMENTATION,
      '/guide/': SIDEBAR_DOCUMENTATION,
      '/introduction/': SIDEBAR_FLUIDFLUX,
      '/compatibility/': SIDEBAR_FLUIDFLUX,
      '/showcase/': SIDEBAR_FLUIDFLUX,
      '/release-notes/': SIDEBAR_FLUIDFLUX,
      '/support/': SIDEBAR_FLUIDFLUX,
      '/': SIDEBAR_FLUIDFLUX
    },
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/rG2q3SB5EB' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCtA9XJo3PIV0Cij5ZTcHr_Q' },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8 7h2v6a2 2 0 0 0 4 0V7h2v6a4 4 0 0 1-8 0V7z"/></svg>'
        },
        link: FAB,
        ariaLabel: 'Fluid Flux on Fab'
      }
    ],
    editLink: {
      pattern: 'https://github.com/ImaginaryBlend/imaginaryblend-docs/edit/main/docs/:path',
      text: 'Suggest a change'
    },
    footer: {
      message: 'Contact: <a href="mailto:imaginaryblend@gmail.com">imaginaryblend@gmail.com</a>',
      copyright: 'Copyright © Imaginary Blend - Krystian Komisarek'
    }
  }
})
