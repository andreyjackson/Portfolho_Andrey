import type { Numero, Perfil } from './tipos'

export const perfil: Perfil = {
  nome: 'Andrey Jackson',
  nomeCompleto: 'Andrey J. Acioli Alencar',
  cargo: 'Full-Stack Developer',
  localizacao: { pt: 'Maceió, AL — Brasil', en: 'Maceió, AL — Brazil' },
  disponibilidade: {
    pt: 'Disponibilidade para mudança de cidade ou trabalho remoto',
    en: 'Open to relocation or remote work',
  },
  resumo: {
    pt: 'Engenheiro da Computação com experiência em desenvolvimento de software para web, desktop e mobile. '
      + 'Atuo em análise de requisitos, construção de interfaces e colaboração com outros desenvolvedores, '
      + 'com proficiência em várias linguagens de programação e bancos de dados.',
    en: 'Computer Engineer with experience building software for web, desktop and mobile. '
      + 'I work on requirements analysis, interface development and collaboration with other developers, '
      + 'with proficiency in several programming languages and databases.',
  },
  email: 'andreyjackson9@gmail.com',
  telefone: '+55 82 99307-5233',
}

export const numeros: Numero[] = [
  { valor: '6+', rotulo: { pt: 'Anos em TI', en: 'Years in IT' } },
  { valor: '8', rotulo: { pt: 'Anos de experiência', en: 'Years of experience' } },
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
