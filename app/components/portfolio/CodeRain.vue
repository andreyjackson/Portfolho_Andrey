<script setup lang="ts">
// Chuva de código no fundo do hero: colunas de glifos com cabeça brilhante e cauda
// que some de forma exponencial. Após `atrasoParada` a chuva desacelera até parar.
const props = withDefaults(defineProps<{
  /** Segundos até a chuva começar a desacelerar (desktop). */
  atrasoParada?: number
  /** Mesmo atraso em telas pequenas. */
  atrasoParadaMobile?: number
}>(), { atrasoParada: 3.5, atrasoParadaMobile: 2.8 })

const emit = defineEmits<{ resolvido: [] }>()

const GLIFOS = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~=>≠≤≥λ'
const LINHAS_COLUNA = 40
const QUEDA = 0.12
const DURACAO_DESACELERACAO = 1.2
const MATIZES = [-15, -7, 0, 7, 15]

const modoDeCor = useColorMode()
const raiz = ref<HTMLDivElement>()
const tela = ref<HTMLCanvasElement>()

type Coluna = { velocidade: number, deslocamento: number, atlas: number }

let colunas: Coluna[] = []
let grade: Uint8Array = new Uint8Array(0)
let atlas: HTMLCanvasElement[] = []
let atlasCabeca: HTMLCanvasElement | undefined
let largura = 0
let altura = 0
let celula = 0
let mobile = false
let reduzido = false
let visivel = true
let quadro = 0
let ultimo = 0
let relogio = 0 // segundos desde o início do ciclo
let tempoChuva = 0 // tempo "da chuva": para de avançar quando a escala chega a 0
let parado = false
let paralaxe = 0
let alvoParalaxe = 0
let observador: IntersectionObserver | undefined
let redimensionador: ResizeObserver | undefined

const atraso = () => (mobile ? props.atrasoParadaMobile : props.atrasoParada)

function criarAtlas(cor: string, tamanho: number) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const cv = document.createElement('canvas')
  const passo = Math.ceil(tamanho * dpr)
  cv.width = passo * GLIFOS.length
  cv.height = passo
  const ctx = cv.getContext('2d')!
  ctx.fillStyle = cor
  ctx.font = `700 ${Math.round(tamanho * dpr * 0.9)}px "Geist Mono", ui-monospace, monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  for (let i = 0; i < GLIFOS.length; i++) {
    ctx.fillText(GLIFOS[i]!, i * passo + passo / 2, passo / 2)
  }
  return cv
}

function preparar() {
  const el = raiz.value
  const cv = tela.value
  if (!el || !cv) return
  mobile = el.clientWidth < 768
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  largura = el.clientWidth
  altura = el.clientHeight
  cv.width = Math.round(largura * dpr)
  cv.height = Math.round(altura * dpr)
  cv.style.width = `${largura}px`
  cv.style.height = `${altura}px`
  cv.getContext('2d')!.setTransform(dpr, 0, 0, dpr, 0, 0)

  const total = mobile ? 40 : 80
  celula = Math.max(10, largura / total)
  const faixa = mobile ? [0.6, 1.0] : [0.8, 1.4]
  colunas = Array.from({ length: total }, () => ({
    velocidade: faixa[0]! + Math.random() * (faixa[1]! - faixa[0]!),
    deslocamento: Math.random(),
    atlas: Math.floor(Math.random() * MATIZES.length),
  }))

  const linhas = Math.ceil(altura / celula) + LINHAS_COLUNA + 2
  grade = new Uint8Array(total * linhas)
  for (let i = 0; i < grade.length; i++) grade[i] = Math.floor(Math.random() * GLIFOS.length)

  montarAtlas()
}

// No tema claro os glifos são verde-escuro e a cabeça da coluna é a parte mais escura.
function montarAtlas() {
  const escuro = modoDeCor.value === 'dark'
  atlas = MATIZES.map(m => criarAtlas(`hsl(${143 + m} ${escuro ? '100% 60%' : '85% 28%'})`, celula))
  atlasCabeca = criarAtlas(escuro ? '#d6ffe4' : '#04341b', celula)
}

function escalaDeTempo() {
  if (reduzido) return 0
  const t = relogio - atraso()
  if (t <= 0) return 1
  return Math.max(0, 1 - t / DURACAO_DESACELERACAO)
}

function desenhar() {
  const cv = tela.value
  if (!cv || !atlasCabeca) return
  const ctx = cv.getContext('2d')!
  ctx.clearRect(0, 0, largura, altura)

  const linhasVisiveis = Math.ceil(altura / celula)
  const passo = atlasCabeca.height
  const total = colunas.length
  const ciclo = linhasVisiveis + LINHAS_COLUNA
  const larguraTela = largura / total

  for (let c = 0; c < total; c++) {
    const col = colunas[c]!
    // Velocidade em alturas de tela por segundo, como no prompt do template.
    const pos = (tempoChuva * col.velocidade * linhasVisiveis + col.deslocamento * ciclo) % ciclo
    const cabeca = Math.floor(pos)
    const x = c * larguraTela + paralaxe * larguraTela * (0.4 + (c % 5) * 0.15)
    const origem = atlas[col.atlas]!

    for (let d = 0; d < LINHAS_COLUNA; d++) {
      const linha = cabeca - d
      if (linha < 0 || linha >= linhasVisiveis) continue
      const alfa = Math.exp(-d * QUEDA)
      if (alfa < 0.03) break
      const indice = grade[c * (linhasVisiveis + LINHAS_COLUNA + 2) + linha]! % GLIFOS.length
      ctx.globalAlpha = alfa
      ctx.drawImage(d === 0 ? atlasCabeca : origem, indice * passo, 0, passo, passo, x, linha * celula, larguraTela, celula)
    }
  }
  ctx.globalAlpha = 1
}

function trocarGlifos(dt: number) {
  // Poucos glifos mudam por quadro: dá a sensação de código "vivo" sem custo.
  const trocas = Math.ceil(grade.length * dt * 0.6)
  for (let i = 0; i < trocas; i++) {
    grade[Math.floor(Math.random() * grade.length)] = Math.floor(Math.random() * GLIFOS.length)
  }
}

function animar(agora: number) {
  quadro = 0
  if (!visivel) {
    ultimo = 0
    return
  }
  const dt = ultimo ? Math.min((agora - ultimo) / 1000, 0.05) : 0
  ultimo = agora
  relogio += dt
  const escala = escalaDeTempo()
  tempoChuva += dt * escala
  if (escala > 0) trocarGlifos(dt * escala)
  else if (!parado) {
    parado = true
    emit('resolvido')
  }
  paralaxe += (alvoParalaxe - paralaxe) * 0.05
  desenhar()
  quadro = requestAnimationFrame(animar)
}

function iniciar() {
  if (reduzido) {
    tempoChuva = 7
    desenhar()
    return
  }
  if (!quadro) quadro = requestAnimationFrame(animar)
}

/** Reinicia o ciclo: a chuva volta à velocidade cheia e desacelera de novo. */
function reiniciar() {
  relogio = 0
  parado = false
  ultimo = 0
  if (!reduzido) iniciar()
}

function aoMoverCursor(e: PointerEvent) {
  if (reduzido) return
  alvoParalaxe = (e.clientX / window.innerWidth - 0.5) * 0.02 * 2
}

defineExpose({ reiniciar })

onMounted(() => {
  reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  preparar()
  if (reduzido) emit('resolvido')
  iniciar()

  redimensionador = new ResizeObserver(() => {
    if (raiz.value?.clientWidth === largura && raiz.value.clientHeight === altura) return
    preparar()
    if (reduzido) desenhar()
  })
  if (raiz.value) redimensionador.observe(raiz.value)

  observador = new IntersectionObserver(([entrada]) => {
    visivel = !!entrada?.isIntersecting
    if (visivel) iniciar()
  })
  if (raiz.value) observador.observe(raiz.value)
  window.addEventListener('pointermove', aoMoverCursor, { passive: true })
  watch(() => modoDeCor.value, () => {
    if (!celula) return
    montarAtlas()
    if (reduzido) desenhar()
  })
})

onBeforeUnmount(() => {
  if (quadro) cancelAnimationFrame(quadro)
  observador?.disconnect()
  redimensionador?.disconnect()
  window.removeEventListener('pointermove', aoMoverCursor)
})
</script>

<template>
  <div ref="raiz" class="code-rain" aria-hidden="true">
    <canvas ref="tela" class="code-rain__tela" />
    <div class="code-rain__scan" />
    <div class="code-rain__vinheta" />
  </div>
</template>

<style scoped>
.code-rain {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  --code-rain-opacidade: 0.4;
}

:global(.dark) .code-rain {
  --code-rain-opacidade: 0.5;
}

.code-rain__tela {
  position: absolute;
  inset: 0;
  opacity: var(--code-rain-opacidade);
}

/* Linhas de varredura de CRT: 3px, 4% de opacidade; desligadas no celular. */
.code-rain__scan {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(to bottom, color-mix(in srgb, var(--ui-text-highlighted) 4%, transparent) 0 1px, transparent 1px 3px);
}

.code-rain__vinheta {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 40%, color-mix(in srgb, var(--ui-bg) 85%, transparent) 100%);
  animation: code-rain-pulso 4s ease-in-out infinite;
}

@keyframes code-rain-pulso {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

@media (max-width: 767px) {
  .code-rain__scan {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .code-rain__vinheta {
    animation: none;
  }
}
</style>
