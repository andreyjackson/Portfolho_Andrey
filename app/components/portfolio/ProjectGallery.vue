<!-- Galeria de capturas de tela na capa de um projeto; sem imagens, mostra o ícone sobre a cor do projeto. -->
<script setup lang="ts">
import { textosProjetos, type Projeto } from '~/data'
import { classesDaCor, corDoItem } from '~/utils/cores'

const props = defineProps<{ projeto: Projeto, posicao: number }>()

const { t } = useIdioma()
const indice = ref(0)
const total = computed(() => props.projeto.imagens?.length ?? 0)
const capa = computed(() => classesDaCor[corDoItem(props.projeto.cor, props.posicao)].capa)

const navegar = (direcao: -1 | 1) => {
  if (total.value < 2) return
  indice.value = (indice.value + direcao + total.value) % total.value
}

const posicaoImagem = computed(() => t(textosProjetos.posicaoImagem)
  .replace('{atual}', String(indice.value + 1))
  .replace('{total}', String(total.value)))
</script>

<template>
  <div
    v-if="projeto.imagens?.length"
    class="relative"
    role="group"
    :aria-label="`${t(textosProjetos.galeria)}: ${t(projeto.titulo)}`"
  >
    <img
      :src="projeto.imagens[indice]"
      :alt="`${t(textosProjetos.capturaDeTela)} ${t(projeto.titulo)} ${indice + 1}`"
      loading="lazy"
      class="aspect-video w-full object-cover"
    >
    <template v-if="total > 1">
      <UButton
        :aria-label="`${t(textosProjetos.imagemAnterior)}: ${t(projeto.titulo)}`"
        icon="i-lucide-chevron-left"
        color="neutral"
        variant="solid"
        size="sm"
        class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-md"
        @click="navegar(-1)"
      />
      <UButton
        :aria-label="`${t(textosProjetos.proximaImagem)}: ${t(projeto.titulo)}`"
        icon="i-lucide-chevron-right"
        color="neutral"
        variant="solid"
        size="sm"
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-md"
        @click="navegar(1)"
      />
      <span
        class="absolute bottom-3 right-3 rounded-full bg-neutral-950/80 px-2.5 py-1 font-mono text-xs text-white"
        aria-live="polite"
      >
        {{ posicaoImagem }}
      </span>
    </template>
  </div>
  <div v-else :class="['flex aspect-video items-center justify-center bg-linear-to-bl', capa]">
    <UIcon :name="projeto.icone" class="size-12" />
  </div>
</template>
