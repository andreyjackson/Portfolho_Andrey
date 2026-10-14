# Portfólio — Andrey Jackson

Nuxt 4 + Nuxt UI. Visual baseado em [`fronte/portifoliov1.pen`](./fronte/portifoliov1.pen).

```sh
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # acusa campo faltando ou digitado errado nos dados
npm run lint       # confere erros e formatação do código (lint:fix corrige sozinho)
```

## Onde editar o conteúdo

Todo texto do site fica em `app/data/`. Os componentes só exibem o que está lá.

| Arquivo | O que tem |
|---|---|
| `perfil.ts` | Nome, cargo, resumo, e-mail, telefone, números do topo e links (GitHub, LinkedIn, WhatsApp, CV) |
| `secoes.ts` | Título, rótulo e descrição de cada seção, **ordem** na página e no menu, e `visivel: false` para esconder |
| `skills.ts` | Cards de habilidades |
| `projetos.ts` | Projetos: descrição, tags, links de código/demo e galerias opcionais de capturas de tela |
| `experiencia.ts` | Cargos, do mais recente para o mais antigo |
| `formacao.ts` | Graduação e cursos |
| `contato.ts` | Botões de contato e informações exibidas como texto |
| `site.ts` | Logo, botões fixos e rodapé |
| `tipos.ts` | Formato de cada item (campos obrigatórios e opcionais) |

Exemplos:

- **Novo projeto:** copie um bloco em `projetos.ts` e troque os campos. `cor` é opcional; sem ela, as cores se alternam.
- **Galeria de capturas de tela:** salve as imagens em `public/projetos/` e informe seus caminhos em `imagens: ['/projetos/tela-1.png', '/projetos/tela-2.png']`.
- **Trocar o currículo:** substitua `public/cv.pdf`.
- **Ícones:** nomes em https://icones.js.org/collection/lucide, no formato `i-lucide-nome`.

## Deploy (Vercel)

Importe o repositório na Vercel e mantenha **Root Directory = `.`** (raiz do repositório). O framework Nuxt e o comando de build são detectados automaticamente.
# Portfolho_Andrey
