import type { InfoIdioma } from './tipos'

/** Opções do seletor de idioma no topo da página. A primeira é o padrão. */
export const idiomas: InfoIdioma[] = [
  { codigo: 'pt', rotulo: 'PT', nome: 'Português', lang: 'pt-BR', ogLocale: 'pt_BR', caminho: '/' },
  { codigo: 'en', rotulo: 'EN', nome: 'English', lang: 'en', ogLocale: 'en_US', caminho: '/en' },
]
