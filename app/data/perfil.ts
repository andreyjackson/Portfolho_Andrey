import type { Numero, Perfil } from './tipos'

export const perfil: Perfil = {
  nome: 'Andrey Jackson',
  nomeCompleto: 'Andrey J. Acioli Alencar',
  cargo: 'Full-Stack Developer',
  /** Frase de valor do topo da página (H1). */
  titulo: {
    pt: 'Sistemas de gestão limpos e objetivos, para você ganhar tempo.',
    en: 'Clean, straightforward management systems that give you time back.',
  },
  localizacao: { pt: 'Maceió, AL — Brasil', en: 'Maceió, AL — Brazil' },
  disponibilidade: {
    pt: 'Aberto a emprego e freelance · remoto ou mudança de cidade',
    en: 'Open to jobs and freelance · remote or relocation',
  },
  resumo: {
    pt: 'Engenheiro da Computação e desenvolvedor Full-Stack. Entendo o processo do negócio, '
      + 'desenho a solução e entrego sistemas de gestão com interface limpa, que a equipe aprende rápido e usa todo dia.',
    en: 'Computer Engineer and Full-Stack developer. I learn how the business runs, '
      + 'design the solution and deliver management systems with a clean interface that teams pick up fast and use every day.',
  },
  email: 'andreyjackson9@gmail.com',
  telefone: '+55 82 99307-5233',
}

export const numeros: Numero[] = [
  { valor: '2019', rotulo: { pt: 'Em TI desde', en: 'In IT since' } },
  { valor: '4', rotulo: { pt: 'Sistemas e sites no portfólio', en: 'Systems and sites in portfolio' } },
  { valor: '3', rotulo: { pt: 'Idiomas', en: 'Languages' } },
]

export const links = {
  github: 'https://github.com/andreyjackson',
  linkedin: 'https://www.linkedin.com/in/andrey-jackson/',
  whatsapp: 'https://wa.me/5582993075233',
  email: `mailto:${perfil.email}`,
  /** Arquivo em `public/cv.pdf`. Para trocar o currículo, substitua esse arquivo. */
  cv: '/cv.pdf',
}
