<script setup lang="ts">
import { hero, numeros, perfil } from '~/data'

const { t } = useIdioma()

const COMANDO = 'whoami'
const MS_POR_CARACTERE = 45

const chuva = ref<{ reiniciar: () => void }>()
const digitado = ref(COMANDO)
let temporizador: ReturnType<typeof setTimeout> | undefined

// O comando só é digitado quando a chuva começa a desacelerar (3,5s no desktop, 2,8s no celular).
function digitar() {
  clearTimeout(temporizador)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    digitado.value = COMANDO
    return
  }
  digitado.value = ''
  const atraso = window.innerWidth < 768 ? 2800 : 3500
  const passo = () => {
    if (digitado.value.length >= COMANDO.length) return
    digitado.value = COMANDO.slice(0, digitado.value.length + 1)
    temporizador = setTimeout(passo, MS_POR_CARACTERE)
  }
  temporizador = setTimeout(passo, atraso)
}

// Clicar no hero (fora de links e botões) reinicia a chuva e a digitação.
function reiniciar(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('a, button')) return
  chuva.value?.reiniciar()
  digitar()
}

onMounted(digitar)
onBeforeUnmount(() => clearTimeout(temporizador))
</script>

<template>
  <section id="sobre" class="relative isolate overflow-hidden border-b border-default" @click="reiniciar">
    <ClientOnly>
      <PortfolioAsciiMonogram fundo />
    </ClientOnly>

    <ClientOnly>
      <PortfolioCodeRain ref="chuva" class="-z-20" />
    </ClientOnly>
    <!-- Véu atrás do texto: mantém o contraste mínimo de 4,5:1 sobre a chuva. -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--ui-bg)_92%,transparent),color-mix(in_srgb,var(--ui-bg)_70%,transparent)_45%,transparent_85%),radial-gradient(60%_60%_at_75%_45%,--alpha(var(--ui-primary)/9%),transparent)] max-lg:bg-default/75"
    />

    <div class="relative z-10 mx-auto max-w-(--ui-container) px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div class="min-w-0">
        <p class="mb-6 font-mono text-[13px] text-primary">
          <span aria-hidden="true">$ {{ digitado }}</span><span class="sr-only">$ {{ COMANDO }}</span><span aria-hidden="true" class="cursor ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-primary" />
        </p>

        <p class="font-display text-xl font-semibold text-highlighted">
          {{ perfil.nome }}
          <span class="ml-2 font-mono text-sm font-normal text-primary">&gt; {{ perfil.cargo }}</span>
        </p>

        <h1 class="mt-5 max-w-3xl font-display text-4xl leading-[1.08] font-bold text-balance text-highlighted sm:text-5xl lg:text-6xl">
          {{ t(perfil.titulo) }}
        </h1>

        <p class="mt-8 max-w-[560px] text-pretty text-toned">
          {{ t(perfil.resumo) }}
        </p>

        <p class="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-dimmed">
          <UIcon name="i-lucide-map-pin" class="size-3.5" />
          <span>{{ t(perfil.localizacao) }}</span>
          <span aria-hidden="true" class="text-muted">·</span>
          <span>{{ t(perfil.disponibilidade) }}</span>
        </p>

        <div class="mt-8 flex flex-wrap gap-4">
          <GradientButton :to="hero.botaoPrincipal.destino" :label="t(hero.botaoPrincipal.rotulo)" size="xl" class="px-8" />
          <UButton
            :to="hero.botaoCv.arquivo"
            external
            :download="hero.botaoCv.nomeDoArquivo"
            :label="t(hero.botaoCv.rotulo)"
            :aria-label="`${t(hero.botaoCv.rotulo)} (PDF)`"
            color="neutral"
            variant="outline"
            size="xl"
            class="bg-elevated px-8 text-highlighted"
          />
        </div>

        <dl v-if="numeros.length" class="mt-10 flex gap-8 border-t border-default pt-8 sm:gap-14">
          <div v-for="numero in numeros" :key="numero.valor" class="flex flex-col-reverse gap-1">
            <dt class="font-mono text-[13px] text-dimmed">
              {{ t(numero.rotulo) }}
            </dt>
            <dd class="font-display text-4xl font-bold text-primary">
              {{ numero.valor }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Cursor piscando a cada 530ms, em passos secos como num terminal. */
.cursor {
  animation: cursor-piscar 1.06s steps(1) infinite;
}

@keyframes cursor-piscar {
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
}
</style>
