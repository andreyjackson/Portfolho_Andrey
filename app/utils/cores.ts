import type { Cor } from '~/data/tipos'

type Tom = 'primary' | 'secondary' | 'info' | 'success'

/** Nome da cor no conteúdo → cor semântica do Nuxt UI (definida em app.config.ts). */
export const tomDaCor: Record<Cor, Tom> = {
  roxo: 'primary',
  rosa: 'secondary',
  ciano: 'info',
  verde: 'success',
}

// Classes completas escritas por extenso para o Tailwind encontrá-las no build.
export const classesDaCor: Record<Cor, { texto: string, fundo: string, capa: string }> = {
  roxo: { texto: 'text-primary', fundo: 'bg-primary', capa: 'from-primary/12 to-primary/3 text-primary' },
  rosa: { texto: 'text-secondary', fundo: 'bg-secondary', capa: 'from-secondary/12 to-secondary/3 text-secondary' },
  ciano: { texto: 'text-info', fundo: 'bg-info', capa: 'from-info/12 to-info/3 text-info' },
  verde: { texto: 'text-success', fundo: 'bg-success', capa: 'from-success/12 to-success/3 text-success' },
}

const sequencia: Cor[] = ['roxo', 'ciano', 'rosa', 'verde']

/** Usa a cor definida no item ou, sem ela, alterna pela posição na lista. */
export function corDoItem(cor: Cor | undefined, posicao: number): Cor {
  return cor ?? sequencia[posicao % sequencia.length]!
}
