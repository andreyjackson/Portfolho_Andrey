import type { GrupoSkills } from './tipos'

// Cada grupo vira um card. Até 4 grupos cabem lado a lado no desktop.
export const skills: GrupoSkills[] = [
  {
    titulo: 'Frontend',
    icone: 'i-lucide-monitor',
    itens: ['React', 'Next.js', 'Nuxt', 'Vue', 'Flutter', 'TypeScript', 'JavaScript'],
  },
  {
    titulo: 'Backend',
    icone: 'i-lucide-server',
    itens: ['NestJS', 'Node.js', 'Express', 'Python', 'REST APIs'],
  },
  {
    titulo: { pt: 'Dados & Ferramentas', en: 'Data & Tools' },
    icone: 'i-lucide-database',
    itens: ['SQL', 'MySQL', 'SQLite', 'MongoDB', 'Git'],
  },
  {
    titulo: { pt: 'Idiomas', en: 'Languages' },
    icone: 'i-lucide-languages',
    itens: [
      { pt: 'Português — materno', en: 'Portuguese — native' },
      { pt: 'Inglês — avançado', en: 'English — advanced' },
      { pt: 'Japonês — iniciante', en: 'Japanese — beginner' },
    ],
  },
]
