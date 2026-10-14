import type { Curso, Graduacao, Texto } from './tipos'

/** Use no lugar do ano enquanto o curso não terminou. */
export const cursando: Texto = { pt: 'Cursando', en: 'In progress' }

export const graduacoes: Graduacao[] = [
  {
    curso: { pt: 'Bacharelado em Engenharia da Computação', en: 'Bachelor\'s in Computer Engineering' },
    instituicao: { pt: 'UMJ — Brasil', en: 'UMJ — Brazil' },
    conclusao: '2025',
  },
]

export const cursos: Curso[] = [
  { nome: 'Ignite — Rocketseat', ano: cursando },
  { nome: 'NodeJS API Development for Beginners', ano: '2024' },
  { nome: { pt: 'Algoritmos e Lógica I', en: 'Algorithms and Logic I' }, ano: '2024' },
  { nome: { pt: 'Curso de Algoritmos e Lógica de Programação', en: 'Algorithms and Programming Logic' }, ano: '2024' },
  { nome: { pt: 'Java do Zero', en: 'Java from Scratch' }, ano: '2020' },
  { nome: { pt: 'Linguagem C para Iniciantes', en: 'C Programming for Beginners' }, ano: '2019' },
]
