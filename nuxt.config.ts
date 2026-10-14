export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@vercel/analytics/nuxt'],
  devtools: { enabled: false },
  app: {
    // Título, descrição, idioma e og:locale são definidos em app.vue, conforme o idioma da página.
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      meta: [
        { name: 'theme-color', content: '#0a0a0f' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  // A página é estática: gerada no build e servida pela CDN da Vercel, sem função serverless por visita.
  // Uma cópia por idioma (ver `data/idiomas.ts`).
  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
  },
  compatibilityDate: '2026-10-01',
  eslint: {
    // Regras de formatação (aspas simples, sem ponto e vírgula, indentação de 2 espaços).
    config: { stylistic: true },
  },
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
    },
  },
})
