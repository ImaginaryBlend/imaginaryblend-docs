import { defineConfig } from 'vitepress'

const FAB = 'https://www.fab.com/listings/196c70cd-1283-4249-bf6b-c3019d1cbe11'
const SITE_URL = 'https://imaginaryblend.github.io/imaginaryblend-docs/'
const DESCRIPTION =
  'Fluid Flux is a real-time water system for Unreal Engine, built on 2D shallow-water simulation – from interactive rivers and floods to coastlines and open oceans.'

// icon before a top-level sidebar group name – icons are defined in theme/icons.css
const icon = (name, text) => `<span class="ib-icon i-${name}"></span>${text}`

const DEFAULT_LABEL = '<span class="ib-default-title"></span>'

const SIDEBAR_FLUIDFLUX = [
  {
    // same style as Documentation: one list of collapsible sections
    items: [
      {
        text: icon('waves', 'Product'),
        collapsed: true,
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Showcase', link: '/product/showcase' },
          { text: 'Performance', link: '/product/performance' },
          { text: 'Limitations', link: '/product/limitations' },
          { text: 'Questions & Answers', link: '/product/faq' }
        ]
      },
      {
        text: icon('cart', 'Purchase'),
        collapsed: true,
        items: [
          { text: 'License', link: '/purchase/license' },
          { text: 'Refund Policy', link: '/purchase/refund-policy' }
        ]
      },
      {
        text: icon('map', 'Roadmap'),
        link: '/updates/',
        collapsed: true,
        items: [
          { text: 'Fluid Flux 3.0', link: '/updates/3-0' },
          { text: 'Fluid Flux 2.0', link: '/updates/2-0' },
          { text: 'Fluid Flux 1.1', link: '/updates/1-1' }
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
        text: icon('rocket', 'Getting started'),
        collapsed: true,
        items: [
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Project settings', link: '/getting-started/project-settings' },
          { text: 'Updating process', link: '/getting-started/updating' },
          { text: 'Tutorials', link: '/getting-started/tutorials' }
        ]
      },
      {
        text: icon('layers', 'Core systems'),
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
              { text: 'Implementation', link: '/core-systems/buoyancy#implementation' },
              { text: 'Buoyancy Editor', link: '/core-systems/buoyancy#buoyancy-editor' },
              { text: 'Troubleshooting', link: '/core-systems/buoyancy#troubleshooting' }
            ]
          },
          {
            text: 'Surface actor',
            link: '/core-systems/surface-actor',
            collapsed: true,
            items: [
              { text: 'Color presets', link: '/core-systems/color-presets' },
              { text: 'World painter', link: '/core-systems/world-painter' },
              { text: 'Reading fluid data', link: '/core-systems/reading-fluid-data' },
              { text: 'Niagara integration', link: '/core-systems/niagara-integration' },
              { text: 'Translucency', link: '/core-systems/translucency' },
              { text: 'Cut the mask and holes', link: '/core-systems/cut-mask-and-holes' }
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
      },
      {
        text: icon('puzzle', 'Compatibility'),
        collapsed: true,
        items: [
          { text: 'Substrate', link: '/compatibility/substrate' },
          { text: 'Multiplayer', link: '/compatibility/multiplayer' },
          { text: 'Open world', link: '/compatibility/open-world' },
          { text: 'Platforms', link: '/compatibility/platforms' },
          { text: 'Third-party plugins', link: '/compatibility/plugins' }
        ]
      },
      {
        text: icon('lifebuoy', 'Help'),
        collapsed: true,
        items: [
          { text: 'Support', link: '/help/support' },
          { text: 'Minimal project', link: '/help/minimal-project' }
        ]
      }
    ]
  }
]

export default defineConfig({
  base: '/imaginaryblend-docs/',
  lang: 'en-US',
  title: 'Fluid Flux',
  description: DESCRIPTION,
  cleanUrls: true,
  markdown: {
    // blocks without their own title show only the type icon (see theme/custom.css)
    container: {
      tipLabel: DEFAULT_LABEL,
      infoLabel: DEFAULT_LABEL,
      warningLabel: DEFAULT_LABEL,
      dangerLabel: DEFAULT_LABEL
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/imaginaryblend-docs/logo.png' }],
    // link preview on Discord, Fab, social media (og:title and og:url are set per page in transformHead)
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Fluid Flux' }],
    ['meta', { property: 'og:description', content: DESCRIPTION }],
    ['meta', { property: 'og:image', content: SITE_URL + 'images/gallery/hero-beach.jpg' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }]
  ],
  transformHead({ pageData }) {
    const path = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const title = pageData.relativePath === 'index.md' ? 'Fluid Flux – real-time water for Unreal Engine' : `${pageData.title} | Fluid Flux`
    return [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:url', content: SITE_URL + path }]
    ]
  },
  themeConfig: {
    logo: { src: '/logo.png', alt: 'Fluid Flux' },
    search: { provider: 'local' },
    outline: [2, 3],
    nav: [
      { text: 'Documentation', link: '/getting-started/installation', activeMatch: '^/(getting-started|core-systems|compatibility|help)/' }
    ],
    sidebar: {
      '/getting-started/': SIDEBAR_DOCUMENTATION,
      '/core-systems/': SIDEBAR_DOCUMENTATION,
      '/compatibility/': SIDEBAR_DOCUMENTATION,
      '/help/': SIDEBAR_DOCUMENTATION,
      '/': SIDEBAR_FLUIDFLUX
    },
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/rG2q3SB5EB' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCtA9XJo3PIV0Cij5ZTcHr_Q' },
      {
        icon: {
          // official Fab logo (public/images/fab-logo.png), rounded like an app icon
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><clipPath id="fab-icon"><rect width="24" height="24" rx="5"/></clipPath><image href="/imaginaryblend-docs/images/fab-logo.png" width="24" height="24" clip-path="url(#fab-icon)"/></svg>'
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
