import type { Projeto } from './tipos'

// Descrições e stacks conferidas nos READMEs e manifestos de cada projeto em ~/programing.
// Capturas em `public/projetos/` são mostradas como galerias nas capas dos projetos.
export const projetos: Projeto[] = [
  {
    titulo: 'Galpão 47',
    descricao: {
      pt: 'Painel de gestão de um centro comercial, com visão executiva, indicadores de desempenho e recursos para acompanhar lojistas e operações.',
      en: 'Management dashboard for a commercial center, with an executive overview, performance indicators and tools to track tenants and operations.',
    },
    icone: 'i-lucide-panels-top-left',
    tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Nitro'],
    cor: 'verde',
    caso: {
      problema: {
        pt: 'A gestão de lojistas e da operação do centro comercial estava espalhada, sem uma visão única do desempenho.',
        en: 'Tenant and operations management of the commercial center was scattered, with no single view of performance.',
      },
      solucao: {
        pt: 'Um painel executivo que reúne indicadores, lojistas e operações em um só lugar, com interface limpa e direta.',
        en: 'An executive dashboard that brings indicators, tenants and operations together in one place, with a clean, direct interface.',
      },
    },
    imagens: [
      '/projetos/galpao-47.jpeg',
      '/projetos/galpao-47-2.jpeg',
      '/projetos/galpao-47-3.jpeg',
      '/projetos/galpao-47-4.jpeg',
      '/projetos/galpao-47-5.jpeg',
      '/projetos/galpao-47-6.jpeg',
      '/projetos/galpao-47-7.jpeg',
      '/projetos/galpao-47-8.jpeg',
      '/projetos/galpao-47-9.jpeg',
    ],
  },
  {
    titulo: { pt: 'Gestão de Imóveis', en: 'Property Manager' },
    descricao: {
      pt: 'Sistema web para gerenciar os imóveis da família para aluguel ou venda: gastos, arrendamentos, fotos, mapa e cálculo automático do lucro na venda.',
      en: 'Web system to manage the family\'s properties for rent or sale: expenses, leases, photos, map and automatic calculation of the profit on a sale.',
    },
    icone: 'i-lucide-building-2',
    tags: ['React', 'Node.js', 'Express', 'Leaflet'],
    cor: 'roxo',
    caso: {
      problema: {
        pt: 'Gastos, arrendamentos e fotos dos imóveis da família ficavam espalhados, e calcular o lucro de uma venda era manual.',
        en: 'Expenses, leases and photos of the family\'s properties were scattered, and calculating the profit on a sale was manual.',
      },
      solucao: {
        pt: 'Um sistema único que registra tudo por imóvel, mostra no mapa e calcula o lucro da venda automaticamente.',
        en: 'A single system that records everything per property, shows it on a map and calculates the profit on a sale automatically.',
      },
    },
    imagens: [
      '/projetos/gestao-imoveis.jpeg',
      '/projetos/gestao-imoveis-2.jpeg',
      '/projetos/gestao-imoveis-3.jpeg',
      '/projetos/gestao-imoveis-4.jpeg',
    ],
  },
  {
    titulo: 'PetVac',
    descricao: {
      pt: 'Carteirinha de saúde digital para pets: vacinas, exames, cirurgias e internações, com acompanhamento do tratamento à distância. Versões em Flutter e em Nuxt.',
      en: 'Digital health record for pets: vaccines, exams, surgeries and hospital stays, with remote follow-up of the treatment. Flutter and Nuxt versions.',
    },
    icone: 'i-lucide-heart',
    tags: ['Flutter', 'Dart', 'Nuxt', 'SQLite'],
    cor: 'rosa',
    imagens: [
      '/projetos/petvac.jpeg',
      '/projetos/petvac-2.jpeg',
      '/projetos/petvac-3.jpeg',
      '/projetos/petvac-4.jpeg',
    ],
  },
  {
    titulo: 'AJ Imóveis',
    descricao: {
      pt: 'Site imobiliário para apresentar imóveis selecionados e ajudar visitantes a encontrar o próximo lar.',
      en: 'Real estate website showcasing selected properties and helping visitors find their next home.',
    },
    icone: 'i-lucide-house',
    tags: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'SQLite'],
    cor: 'ciano',
    imagens: [
      '/projetos/aj-imoveis.jpeg',
      '/projetos/aj-imoveis-2.jpeg',
      '/projetos/aj-imoveis-3.jpeg',
      '/projetos/aj-imoveis-4.jpeg',
    ],
  },

]
