import type { Experiencia } from './tipos'

// Do cargo mais recente para o mais antigo.

export const experiencia: Experiencia[] = [
  {
    cargo: { pt: 'Analista de TI', en: 'IT Analyst' },
    empresa: 'Audo Seguradora',
    descricao: {
      pt: 'Análise e resolução de problemas técnicos, aplicação prática de IA (inteligência artificial) e criação de soluções internas.',
      en: 'Technical troubleshooting, practical use of AI (artificial intelligence) and development of internal solutions.',
    },
    periodo: { pt: 'Dez 2025 — Presente', en: 'Dec 2025 — Present' },
  },
  {
    cargo: { pt: 'Desenvolvedor Júnior', en: 'Junior Developer' },
    empresa: { pt: 'Espace SHIP · Remoto', en: 'Espace SHIP · Remote' },
    descricao: {
      pt: 'Desenvolvimento de aplicações web que melhoram e organizam o atendimento em clínicas do Detran.',
      en: 'Built web applications for Detran (Brazilian DMV) clinics to improve and organize customer service.',
    },
    periodo: { pt: 'Jun 2025 — Dez 2025', en: 'Jun 2025 — Dec 2025' },
  },
  {
    cargo: { pt: 'Desenvolvedor Full-Stack', en: 'Full-Stack Developer' },
    empresa: 'Freelancer',
    descricao: {
      pt: 'Aplicação web para uma empresa e bot de WhatsApp para atendimento ao cliente, da análise de requisitos ao treinamento e suporte aos usuários.',
      en: 'Company web app and WhatsApp customer service bot, from requirements analysis to user training and support.',
    },
    periodo: { pt: 'Jun 2024 — Dez 2024', en: 'Jun 2024 — Dec 2024' },
  },
  {
    cargo: { pt: 'Analista de TI', en: 'IT Analyst' },
    empresa: 'TV Pajuçara',
    descricao: {
      pt: 'Análise e resolução de problemas técnicos, manutenção de equipamentos e suporte ao usuário.',
      en: 'Technical troubleshooting, equipment maintenance and user support.',
    },
    periodo: '2023 — 2025',
  },
  {
    cargo: { pt: 'Suporte de TI (Estágio)', en: 'IT Support (Internship)' },
    empresa: { pt: 'Farmácia Permanente', en: 'Farmácia Permanente (pharmacy)' },
    descricao: {
      pt: 'Suporte técnico aos usuários, manutenção de equipamentos e manipulação de dados com SQL.',
      en: 'Technical support for users, equipment maintenance and SQL data handling.',
    },
    periodo: '2019 — 2023',
  },
]
