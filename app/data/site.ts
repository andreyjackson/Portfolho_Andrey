import { links, perfil } from './perfil'

// Textos fixos do cabeçalho, do topo da página, do rodapé e dos componentes.

/** Título e descrição da aba do navegador e das prévias de link. */
export const seo = {
  titulo: `${perfil.nome} — Full-Stack Developer`,
  descricao: {
    pt: `${perfil.nomeCompleto} (${perfil.nome}) — Engenheiro da Computação e desenvolvedor Full-Stack em Maceió, AL. `
      + 'React, Next.js, TypeScript, NestJS, Node.js, Python e SQL.',
    en: `${perfil.nomeCompleto} (${perfil.nome}) — Computer Engineer and Full-Stack developer in Maceió, AL, Brazil. `
      + 'React, Next.js, TypeScript, NestJS, Node.js, Python and SQL.',
  },
}

export const cabecalho = {
  logo: 'AJ',
  /** Nome do logo para leitores de tela (o logo leva ao topo da página). */
  rotuloLogo: { pt: `${perfil.nome} — início`, en: `${perfil.nome} — home` },
  /** Primeiro link da página; só aparece ao navegar pelo teclado (Tab). */
  pularConteudo: { pt: 'Pular para o conteúdo', en: 'Skip to content' },
  botao: { rotulo: { pt: 'Fale Comigo', en: 'Contact Me' }, destino: '#contato' },
  /** Rótulo do botão de tema: descreve a ação, não o estado atual. */
  tema: {
    paraClaro: { pt: 'Mudar para o tema claro', en: 'Switch to light theme' },
    paraEscuro: { pt: 'Mudar para o tema escuro', en: 'Switch to dark theme' },
  },
}

export const hero = {
  /** Item do menu que leva ao topo da página. */
  menu: { pt: 'Sobre', en: 'About' },
  botaoPrincipal: { rotulo: { pt: 'Ver Projetos', en: 'View Projects' }, destino: '#projetos' },
  botaoCv: { rotulo: { pt: 'Baixar CV', en: 'Download CV' }, arquivo: links.cv, nomeDoArquivo: `CV ${perfil.nome}.pdf` },
  /** Nome do seletor de idioma para leitores de tela. */
  seletorIdioma: { pt: 'Idioma', en: 'Language' },
}

/** Aviso lido por leitores de tela nos links que abrem outra aba. */
export const novaAba = { pt: 'abre em nova aba', en: 'opens in a new tab' }

export const textosProjetos = {
  problema: { pt: 'Problema', en: 'Problem' },
  solucao: { pt: 'Solução', en: 'Solution' },
  resultado: { pt: 'Resultado', en: 'Result' },
  verProjeto: { pt: 'Ver projeto', en: 'View project' },
  verCodigo: { pt: 'Ver código', en: 'View code' },
  /** Seguido do nome do projeto. */
  capturaDeTela: { pt: 'Captura de tela do projeto', en: 'Screenshot of the project' },
  galeria: { pt: 'Galeria de capturas de tela', en: 'Screenshot gallery' },
  imagemAnterior: { pt: 'Imagem anterior', en: 'Previous image' },
  proximaImagem: { pt: 'Próxima imagem', en: 'Next image' },
  posicaoImagem: { pt: 'Imagem {atual} de {total}', en: 'Image {atual} of {total}' },
}

export const textosFormacao = {
  /** Seguido do ano de conclusão. */
  concluidoEm: { pt: 'Concluído em', en: 'Completed in' },
  cursos: { pt: 'Cursos e conhecimento adicional', en: 'Courses and additional learning' },
}

export const rodape = {
  /** `{ano}` é trocado pelo ano atual. */
  esquerda: {
    pt: `© {ano} ${perfil.nome}. Todos os direitos reservados.`,
    en: `© {ano} ${perfil.nome}. All rights reserved.`,
  },
  direita: { pt: 'Feito com ♥ e muito café', en: 'Made with ♥ and lots of coffee' },
}
