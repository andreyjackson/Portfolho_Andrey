// Formatos de cada informação do portfólio.
// Ao editar os arquivos desta pasta, o editor acusa campo faltando ou com nome errado.

/** Cores de destaque do design. Quando omitida, a cor alterna sozinha entre os itens. */
export type Cor = 'roxo' | 'rosa' | 'ciano' | 'verde'

/**
 * Ícone no formato `i-{coleção}-{nome}`.
 * Lucide (`i-lucide-...`) para ícones gerais e Simple Icons (`i-simple-icons-...`) para marcas.
 * Busque nomes em https://icones.js.org/collection/lucide
 */
export type Icone = `i-${string}`

/** Idiomas do site. `pt` é o padrão (servido em `/`); `en` fica em `/en`. */
export type Idioma = 'pt' | 'en'

/**
 * Texto traduzido: `{ pt: 'Olá', en: 'Hello' }`.
 * Uma string simples vale para os dois idiomas (nomes próprios, tecnologias...).
 */
export type Texto = string | Record<Idioma, string>

export interface InfoIdioma {
  codigo: Idioma
  /** Texto do botão, ex.: "PT". */
  rotulo: string
  /** Nome lido por leitores de tela, ex.: "Português". */
  nome: string
  /** Valor do atributo `lang` do HTML. */
  lang: string
  ogLocale: string
  caminho: string
}

export interface Perfil {
  /** Nome exibido no topo da página. */
  nome: string
  nomeCompleto: string
  /** Etiqueta acima do nome, ex.: "Full-Stack Developer". */
  cargo: Texto
  /** Frase de valor do topo da página (H1). */
  titulo: Texto
  localizacao: Texto
  disponibilidade: Texto
  /** Parágrafo abaixo do nome. */
  resumo: Texto
  email: string
  telefone: string
}

/** Destaques numéricos do topo, ex.: { valor: '2019', rotulo: 'Em TI desde' }. */
export interface Numero {
  valor: string
  rotulo: Texto
}

export type IdSecao = 'skills' | 'projetos' | 'experiencia' | 'formacao' | 'contato'

export interface Secao {
  /** Âncora da seção na página (#skills, #projetos...). */
  id: IdSecao
  /** Texto do item no menu. */
  menu: Texto
  /** Texto pequeno acima do título, ex.: "// PROJETOS". */
  rotulo: Texto
  titulo: Texto
  descricao?: Texto
  /** Cor do rótulo. */
  cor: Cor
  /** Fundo levemente mais claro, para separar visualmente das seções vizinhas. */
  fundoDestacado?: boolean
  /** `false` esconde a seção da página e do menu sem apagar o conteúdo. */
  visivel?: boolean
}

export interface GrupoSkills {
  titulo: Texto
  icone: Icone
  itens: Texto[]
}

export interface Projeto {
  titulo: Texto
  descricao: Texto
  /** Ícone mostrado na capa quando não há imagem. */
  icone: Icone
  tags: string[]
  cor?: Cor
  /** Capturas de tela em `public/`, exibidas como uma galeria na capa. */
  imagens?: string[]
  /** Link do código (GitHub). Só para repositórios públicos. */
  repositorio?: string
  /** Link do projeto publicado. */
  demo?: string
  /** Projeto em destaque: ocupa a largura toda e mostra o estudo de caso. */
  caso?: EstudoDeCaso
}

/** `resultado` só deve ser preenchido com um resultado real e verificável. */
export interface EstudoDeCaso {
  problema: Texto
  solucao: Texto
  resultado?: Texto
}

export interface Experiencia {
  cargo: Texto
  empresa: Texto
  /** Ex.: 'Jun 2025 — Dez 2025'. Pode ficar vazio. */
  periodo?: Texto
  descricao?: Texto
  cor?: Cor
}

export interface Graduacao {
  curso: Texto
  instituicao: Texto
  /** Ano de conclusão, ou `cursando`. */
  conclusao: Texto
}

export interface Curso {
  nome: Texto
  /** Ano, ou `cursando`. */
  ano: Texto
}

export interface LinkContato {
  rotulo: Texto
  icone: Icone
  url: string
}

export interface InfoContato {
  icone: Icone
  /** Texto lido por leitores de tela. */
  descricao: Texto
  texto: Texto
}
