import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/fluid-flux-docs/',
  title: "Fluid Flux",
  description: "Dokumentacja systemu symulacji płynów w Unreal Engine",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Strona Główna', link: '/' },
      { text: 'Dokumentacja', link: '/getting-started/introduction' }
    ],
    sidebar: [
      {
        text: 'Pierwsze Kroki',
        items: [
          { text: 'Wprowadzenie', link: '/getting-started/introduction' },
          { text: 'Instalacja & Ustawienia UE', link: '/getting-started/installation' }
        ]
      },
      {
        text: 'Komponenty & Systemy',
        items: [
          { text: 'Buoyancy Component', link: '/components/buoyancy' }
        ]
      }
    ]
  }
})