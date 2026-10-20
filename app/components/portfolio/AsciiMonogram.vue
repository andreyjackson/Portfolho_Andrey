<script setup lang="ts">
// Monograma 3D girando, desenhado como caracteres ASCII.
// O texto é rasterizado, extrudado em pontos com normais, girado, projetado
// numa grade de caracteres com z-buffer e sombreado por uma luz fixa.
const props = withDefaults(defineProps<{
  texto?: string
  rotulo?: string
  fundo?: boolean
}>(), { texto: 'AJ', rotulo: 'Monograma AJ em ASCII', fundo: false })

const RAMPA = ' .,:;-=+*#%@'
const RESOLUCAO = 220
const PROFUNDIDADE = 30

type Ponto = { x: number, y: number, z: number, nx: number, ny: number, nz: number }

const modoDeCor = useColorMode()
const raiz = ref<HTMLDivElement>()
const tela = ref<HTMLCanvasElement>()

let pontos: Ponto[] = []
let largura = 0
let altura = 0
let colunas = 0
let linhas = 0
let celula = 0
let quadro = 0
let observador: IntersectionObserver | undefined
let redimensionador: ResizeObserver | undefined
let visivel = true
let reduzido = false
let ultimaRolagem = 0
let alvoX = 0
let alvoY = 0
let inclinacaoX = 0
let inclinacaoY = 0
let angulo = 0.55

function construirPontos(texto: string) {
  const w = RESOLUCAO
  const h = Math.round(RESOLUCAO * 0.7)
  const fora = document.createElement('canvas')
  fora.width = w
  fora.height = h
  const ctx = fora.getContext('2d', { willReadFrequently: true })!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${Math.round(h * 0.95)}px "Space Grotesk", "Inter", sans-serif`
  ctx.fillText(texto, w / 2, h / 2 + h * 0.04)

  const dados = ctx.getImageData(0, 0, w, h).data
  const solido = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < w && y < h && dados[(y * w + x) * 4]! > 128

  const lista: Ponto[] = []
  const escala = 1 / h
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!solido(x, y)) continue
      const px = (x - w / 2) * escala
      const py = (y - h / 2) * escala
      const profundo = (PROFUNDIDADE / 2) * escala * 2

      // Faces frontal e traseira.
      lista.push({ x: px, y: py, z: profundo, nx: 0, ny: 0, nz: 1 })
      lista.push({ x: px, y: py, z: -profundo, nx: 0, ny: 0, nz: -1 })

      // Laterais: a normal aponta para o lado vazio vizinho.
      const nx = (solido(x - 1, y) ? 0 : -1) + (solido(x + 1, y) ? 0 : 1)
      const ny = (solido(x, y - 1) ? 0 : -1) + (solido(x, y + 1) ? 0 : 1)
      if (nx || ny) {
        const norma = Math.hypot(nx, ny)
        for (let k = 1; k < PROFUNDIDADE; k++) {
          const z = (k / PROFUNDIDADE * 2 - 1) * profundo
          lista.push({ x: px, y: py, z, nx: nx / norma, ny: ny / norma, nz: 0 })
        }
      }
    }
  }
  return lista
}

function medir() {
  const el = raiz.value
  const cv = tela.value
  if (!el || !cv) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  largura = el.clientWidth
  altura = el.clientHeight
  cv.width = Math.round(largura * dpr)
  cv.height = Math.round(altura * dpr)
  cv.style.width = `${largura}px`
  cv.style.height = `${altura}px`
  const ctx = cv.getContext('2d')!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  // Caractere monoespaçado tem ~0,6 de largura por 1 de altura.
  celula = Math.max(6, Math.min(10, Math.round(largura / 85)))
  colunas = Math.floor(largura / (celula * 0.6))
  linhas = Math.floor(altura / celula)
}

function desenhar() {
  const cv = tela.value
  if (!cv || !colunas) return
  const ctx = cv.getContext('2d')!
  ctx.clearRect(0, 0, largura, altura)
  ctx.font = `${celula}px "Geist Mono", ui-monospace, monospace`
  ctx.textBaseline = 'top'

  const giro = angulo + inclinacaoY
  const cosA = Math.cos(giro)
  const sinA = Math.sin(giro)
  const cosB = Math.cos(inclinacaoX)
  const sinB = Math.sin(inclinacaoX)
  // Luz vinda do alto à esquerda, na frente.
  const lx = -0.45
  const ly = -0.5
  const lz = 0.74

  const brilho = new Float32Array(colunas * linhas)
  const fundo = new Float32Array(colunas * linhas).fill(-Infinity)
  const larguraCelula = celula * 0.6
  // Altura do monograma = 82% da área; x e y dos pontos estão em unidades de altura.
  // No modo fundo (desktop) o monograma fica à direita, longe do título; no celular, centralizado.
  const lado = props.fundo && largura >= 1024
  const escalaPx = lado ? Math.min(altura * 0.7, largura * 0.34) : altura * 0.82
  const centro = lado ? colunas * 0.74 : colunas / 2

  for (const p of pontos) {
    // Gira em Y (rotação contínua) e depois inclina em X (cursor).
    const x1 = p.x * cosA + p.z * sinA
    const z1 = -p.x * sinA + p.z * cosA
    const y2 = p.y * cosB - z1 * sinB
    const z2 = p.y * sinB + z1 * cosB

    // Descarta o que está virado para longe da câmera (evita a face traseira vazar).
    const nx1 = p.nx * cosA + p.nz * sinA
    const nz1 = -p.nx * sinA + p.nz * cosA
    const ny2 = p.ny * cosB - nz1 * sinB
    const nz2 = p.ny * sinB + nz1 * cosB
    if (nz2 <= 0.02) continue

    const col = Math.round(centro + x1 * escalaPx / larguraCelula)
    const lin = Math.round(linhas / 2 + y2 * escalaPx / celula)
    if (col < 0 || lin < 0 || col >= colunas || lin >= linhas) continue

    const i = lin * colunas + col
    if (z2 <= fundo[i]!) continue
    fundo[i] = z2

    const difusa = Math.max(0, nx1 * lx + ny2 * ly + nz2 * lz)
    // Laterais ganham brilho extra para contornar as letras.
    const borda = p.nz === 0 ? 0.25 : 0
    brilho[i] = Math.min(1, 0.22 + 0.6 * difusa + borda)
  }

  // Verde da marca no escuro; verde-escuro no claro, para ter contraste sobre fundo branco.
  const escuro = modoDeCor.value === 'dark'
  const rgb = escuro ? '74, 246, 136' : '15, 118, 58'
  for (let lin = 0; lin < linhas; lin++) {
    for (let col = 0; col < colunas; col++) {
      const b = brilho[lin * colunas + col]!
      if (b <= 0) continue
      const c = RAMPA[Math.min(RAMPA.length - 1, Math.floor(b * RAMPA.length))]!
      if (c === ' ') continue
      const opacidade = (props.fundo ? 0.06 + b * 0.14 : 0.25 + b * 0.75) * (escuro ? 1 : 1.6)
      ctx.fillStyle = `rgba(${rgb}, ${opacidade})`
      ctx.fillText(c, col * larguraCelula, lin * celula)
    }
  }
}

function animar() {
  quadro = 0
  if (!visivel) return
  if (reduzido) {
    desenhar()
    return
  }
  angulo += 0.012
  if (!props.fundo) {
    inclinacaoX += (alvoX - inclinacaoX) * 0.06
    inclinacaoY += (alvoY - inclinacaoY) * 0.06
  }
  desenhar()
  quadro = requestAnimationFrame(animar)
}

function iniciar() {
  if (reduzido) {
    desenhar()
    return
  }
  if (!quadro) quadro = requestAnimationFrame(animar)
}

function aoRolar() {
  if (!props.fundo || reduzido) return
  const rolagem = window.scrollY
  angulo += (rolagem - ultimaRolagem) * 0.0015
  ultimaRolagem = rolagem
}

function aoMoverCursor(e: PointerEvent) {
  const el = raiz.value
  if (!el || reduzido || props.fundo) return
  const r = el.getBoundingClientRect()
  alvoX = ((e.clientY - r.top) / r.height - 0.5) * 0.7
  alvoY = ((e.clientX - r.left) / r.width - 0.5) * 0.7
}

onMounted(async () => {
  reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  try {
    await document.fonts.load(`700 40px "Space Grotesk"`, props.texto)
  }
  catch {
    // Sem a fonte do site, o monograma usa a fonte sem serifa do sistema.
  }
  pontos = construirPontos(props.texto)
  medir()
  iniciar()
  ultimaRolagem = window.scrollY

  redimensionador = new ResizeObserver(() => {
    medir()
    if (reduzido || props.fundo) iniciar()
  })
  if (raiz.value) redimensionador.observe(raiz.value)

  if (props.fundo) {
    window.addEventListener('scroll', aoRolar, { passive: true })
    observador = new IntersectionObserver(([entrada]) => {
      visivel = !!entrada?.isIntersecting
      if (visivel) iniciar()
      else if (quadro) {
        cancelAnimationFrame(quadro)
        quadro = 0
      }
    })
    if (raiz.value) observador.observe(raiz.value)
  }
  else {
    observador = new IntersectionObserver(([entrada]) => {
      visivel = !!entrada?.isIntersecting
      if (visivel) iniciar()
    })
    if (raiz.value) observador.observe(raiz.value)
    window.addEventListener('pointermove', aoMoverCursor, { passive: true })
  }

  // A cor depende do tema; redesenha na troca (o laço pode estar parado).
  watch(() => modoDeCor.value, () => iniciar())
})

onBeforeUnmount(() => {
  if (quadro) cancelAnimationFrame(quadro)
  observador?.disconnect()
  redimensionador?.disconnect()
  window.removeEventListener('scroll', aoRolar)
  window.removeEventListener('pointermove', aoMoverCursor)
})
</script>

<template>
  <div
    ref="raiz"
    :class="fundo ? 'pointer-events-none absolute inset-0 z-0 overflow-hidden' : 'relative aspect-[10/7] w-full'"
  >
    <canvas
      ref="tela"
      :role="fundo ? undefined : 'img'"
      :aria-label="fundo ? undefined : rotulo"
      :aria-hidden="fundo || undefined"
      :class="fundo ? 'absolute inset-0 opacity-35 lg:opacity-100' : 'absolute inset-0'"
    />
  </div>
</template>
