import { idiomas, type Idioma, type Texto } from '~/data'

/**
 * Idioma da página atual, vindo da URL: `/` é português e `/en` é inglês.
 * `t(texto)` devolve a versão de um `Texto` no idioma atual.
 */
export function useIdioma() {
  const route = useRoute()

  const idioma = computed<Idioma>(() => route.params.idioma === 'en' ? 'en' : 'pt')
  const atual = computed(() => idiomas.find(opcao => opcao.codigo === idioma.value)!)

  const t = (texto: Texto) => typeof texto === 'string' ? texto : texto[idioma.value]

  return { idioma, atual, t }
}
