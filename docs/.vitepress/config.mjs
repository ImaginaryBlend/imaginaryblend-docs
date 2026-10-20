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
          { text: 'Limitations', link: '/requirements/limitations' },
          { text: 'Performance', link: '/requirements/performance' },
          {
            text: 'Compatibility',
            collapsed: true,
            items: [
              { text: 'Substrate', link: '/requirements/compatibility/substrate' },
              { text: 'Multiplayer', link: '/requirements/compatibility/multiplayer' },
              { text: 'Open world', link: '/requirements/compatibility/open-world' },
              { text: 'Platforms', link: '/requirements/compatibility/platforms' },
              { text: 'Third-party plugins', link: '/requirements/compatibility/plugins' }
            ]
          }
        ]
      },
      {
        text: 'Purchase',
        collapsed: true,
        items: [
          { text: 'License', link: '/purchase/license' },
          { text: 'Refund Policy', link: '/purchase/refund-policy' }
        ]
      },
      {
        text: 'Updates',
        collapsed: true,
        items: [
          { text: 'Roadmap', link: '/updates/' },
          { text: 'Fluid Flux 3.0', link: '/updates/3-0' },
          { text: 'Fluid Flux 2.0', link: '/updates/2-0' },
          { text: 'Fluid Flux 1.1', link: '/updates/1-1' }
        ]
      },
      {
        text: 'Help',
        collapsed: true,
        items: [
          { text: 'Questions & Answers', link: '/help/faq' },
          { text: 'Support', link: '/help/support' },
          { text: 'Reporting bugs', link: '/help/reporting-bugs' }
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
          { text: 'Project structure', link: '/core-systems/project-structure' },
          {
            text: 'Player character',
            link: '/core-systems/player-character',
            collapsed: true,
            items: [
              { text: 'Swimming component', link: '/core-systems/player-character#swimming-component' },
              { text: 'Vehicle driver', link: '/core-systems/player-character#vehicle-driver' }
            ]
          },
          {
            text: 'Buoyancy',
            link: '/core-systems/buoyancy',
            collapsed: true,
            items: [
              { text: 'Limitations', link: '/core-systems/buoyancy#limitations' },
              { text: 'Adding a buoyancy system', link: '/core-systems/buoyancy#adding-a-buoyancy-system-to-the-actor' },
              { text: 'Using FluxBuoyancyEditor', link: '/core-systems/buoyancy#using-fluxbuoyancyeditor' },
              { text: 'Good practices', link: '/core-systems/buoyancy#good-practices-and-solving-problems' }
            ]
          },
          {
            text: 'Surface actor',
            link: '/core-systems/surface-actor',
            collapsed: true,
            items: [
              { text: 'Color presets', link: '/core-systems/surface-actor#color-presets' },
              { text: 'World painter and brush', link: '/core-systems/surface-actor#world-painter-and-brush' },
              { text: 'Reading fluid data', link: '/core-systems/surface-actor#reading-fluid-data' },
              { text: 'Niagara integration', link: '/core-systems/surface-actor#niagara-integration' },
              { text: 'Translucency', link: '/core-systems/surface-actor#translucency' },
              { text: 'Cut the mask and holes', link: '/core-systems/surface-actor#cut-the-mask-and-holes' }
            ]
          },
          {
            text: 'Interactions',
            link: '/core-systems/interactions',
            collapsed: true,
            items: [
              { text: 'Setting up interactions', link: '/core-systems/interactions#setting-up-interactions' },
              { text: 'Splashes', link: '/core-systems/interactions#splashes' }
            ]
          },
          {
            text: 'Ground capture',
            link: '/core-systems/ground-capture',
            collapsed: true,
            items: [
              { text: 'Visibility options', link: '/core-systems/ground-capture#visibility-options' },
              { text: 'Solving issues', link: '/core-systems/ground-capture#solving-issues' }
            ]
          },
          {
            text: 'Simulation Domain',
            link: '/core-systems/simulation-domain',
            collapsed: true,
            items: [
              { text: 'Modifier Component', link: '/core-systems/simulation-domain#modifier-component' },
              { text: 'Modifier Container', link: '/core-systems/simulation-domain#modifier-container' },
              { text: 'Solving issues', link: '/core-systems/simulation-domain#solving-issues' },
              { text: 'Fluid state', link: '/core-systems/simulation-domain#fluid-state' },
              { text: 'Dynamic ground', link: '/core-systems/simulation-domain#dynamic-ground' },
              { text: 'Mesh generator', link: '/core-systems/simulation-domain#mesh-generator' },
              { text: 'Recreating Ocean', link: '/core-systems/simulation-domain#recreating-ocean' },
              { text: 'Sequencer', link: '/core-systems/simulation-domain#sequencer' }
            ]
          },
          {
            text: 'Coastline Domain',
            link: '/core-systems/coastline-domain',
            collapsed: true,
            items: [
              { text: 'Coastline state', link: '/core-systems/coastline-domain#coastline-state' },
              { text: 'Solving Issues', link: '/core-systems/coastline-domain#solving-issues' }
            ]
          },
          {
            text: 'Glass system',
            link: '/core-systems/glass-system',
            collapsed: true,
            items: [
              { text: 'Examples', link: '/core-systems/glass-system#examples' },
              { text: 'Masking surface', link: '/core-systems/glass-system#masking-surface' },
              { text: 'Glass rendering', link: '/core-systems/glass-system#glass-rendering' }
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
      { text: 'Documentation', link: '/getting-started/installation', activeMatch: '^/(getting-started|core-systems)/' },
      { text: 'Download', link: FAB }
    ],
    sidebar: {
      '/getting-started/': SIDEBAR_DOCUMENTATION,
      '/core-systems/': SIDEBAR_DOCUMENTATION,
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
