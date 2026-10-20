import type { Secao } from './tipos'

// Ordem desta lista = ordem das seções na página e no menu.
// Para esconder uma seção sem apagar o conteúdo, use `visivel: false`.
export const secoes: Secao[] = [
  {
    id: 'projetos',
    menu: { pt: 'Projetos', en: 'Projects' },
    rotulo: { pt: '// PROJETOS', en: '// PROJECTS' },
    titulo: { pt: 'Sistemas que economizam tempo', en: 'Systems that save time' },
    descricao: { pt: 'Ferramentas de gestão com interface limpa e objetiva, feitas para quem empreende.', en: 'Management tools with a clean, straightforward interface, built for people who run a business.' },
    cor: 'ciano',
    fundoDestacado: true,
  },
  {
    id: 'experiencia',
    menu: { pt: 'Experiência', en: 'Experience' },
    rotulo: { pt: '// EXPERIÊNCIA', en: '// EXPERIENCE' },
    titulo: { pt: 'Trajetória Profissional', en: 'Career Path' },
    cor: 'rosa',
  },
  {
    id: 'skills',
    menu: 'Skills',
    rotulo: { pt: '// TECNOLOGIAS', en: '// TECH STACK' },
    titulo: { pt: 'Habilidades & Tecnologias', en: 'Skills & Technologies' },
    descricao: { pt: 'Ferramentas e linguagens que uso no dia a dia.', en: 'Tools and languages I use every day.' },
    cor: 'roxo',
  },
  {
    id: 'formacao',
    menu: { pt: 'Formação', en: 'Education' },
    rotulo: { pt: '// FORMAÇÃO', en: '// EDUCATION' },
    titulo: { pt: 'Formação & Cursos', en: 'Education & Courses' },
    descricao: { pt: 'Base acadêmica e aprendizado contínuo.', en: 'Academic background and continuous learning.' },
    cor: 'ciano',
  },
  {
    id: 'contato',
    menu: { pt: 'Contato', en: 'Contact' },
    rotulo: { pt: '// CONTATO', en: '// CONTACT' },
    titulo: { pt: 'Vamos trabalhar juntos?', en: 'Let\'s work together?' },
    descricao: {
      pt: 'Estou disponível para projetos freelance, colaborações e oportunidades de trabalho — presencial em Maceió ou remoto.',
      en: 'I\'m available for freelance projects, collaborations and job opportunities — on-site in Maceió or remote.',
    },
    cor: 'verde',
    fundoDestacado: true,
  },
]
