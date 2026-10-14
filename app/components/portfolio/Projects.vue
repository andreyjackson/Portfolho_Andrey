<script setup lang="ts">
import { novaAba, projetos, textosProjetos, type Secao, type Texto } from '~/data'
import { classesDaCor, corDoItem, tomDaCor } from '~/utils/cores'

defineProps<{ secao: Secao }>()

const { t } = useIdioma()
const indicesGaleria = ref<Record<string, number>>({})

/** Nome completo do link para leitores de tela, ex.: "Ver código: Vigia (abre em nova aba)". */
const rotuloLink = (acao: Texto, projeto: Texto) => `${t(acao)}: ${t(projeto)} (${t(novaAba)})`

const indiceAtual = (projeto: (typeof projetos)[number]) => indicesGaleria.value[projeto.icone] ?? 0

const navegarGaleria = (projeto: (typeof projetos)[number], direcao: -1 | 1) => {
  const total = projeto.imagens?.length ?? 0
  if (total < 2) return

  indicesGaleria.value[projeto.icone] = (indiceAtual(projeto) + direcao + total) % total
}

const posicaoImagem = (atual: number, total: number) => t(textosProjetos.posicaoImagem)
  .replace('{atual}', String(atual + 1))
  .replace('{total}', String(total))

const cards = computed(() => projetos.map((projeto, posicao) => {
  const cor = corDoItem(projeto.cor, posicao)
  return { ...projeto, tom: tomDaCor[cor], capa: classesDaCor[cor].capa }
}))
</script>

<template>
  <PortfolioSecao :secao="secao">
    <div class="grid gap-6 md:grid-cols-2">
      <UPageCard
        v-for="projeto in cards"
        :key="projeto.icone"
        :title="t(projeto.titulo)"
        :description="t(projeto.descricao)"
        variant="outline"
        :ui="{
          root: 'overflow-hidden bg-elevated transition-colors hover:bg-accented',
          container: 'p-0 sm:p-0 gap-y-0',
          header: 'mb-0 w-full',
          body: 'px-6 pt-6',
          title: 'font-display text-xl',
          description: 'mt-3 text-sm/normal',
          footer: 'px-6 pb-6 pt-3',
        }"
      >
        <template #title>
          <h3>{{ t(projeto.titulo) }}</h3>
        </template>

        <template #header>
          <div
            v-if="projeto.imagens?.length"
            class="group/gallery relative"
            role="group"
            :aria-label="`${t(textosProjetos.galeria)}: ${t(projeto.titulo)}`"
          >
            <img
              :src="projeto.imagens[indiceAtual(projeto)]"
              :alt="`${t(textosProjetos.capturaDeTela)} ${t(projeto.titulo)} ${indiceAtual(projeto) + 1}`"
              loading="lazy"
              class="aspect-video w-full object-cover"
            >
            <template v-if="projeto.imagens.length > 1">
              <UButton
                :aria-label="`${t(textosProjetos.imagemAnterior)}: ${t(projeto.titulo)}`"
                icon="i-lucide-chevron-left"
                color="neutral"
                variant="solid"
                size="sm"
                class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full shadow-md"
                @click="navegarGaleria(projeto, -1)"
              />
              <UButton
                :aria-label="`${t(textosProjetos.proximaImagem)}: ${t(projeto.titulo)}`"
                icon="i-lucide-chevron-right"
                color="neutral"
                variant="solid"
                size="sm"
                class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full shadow-md"
                @click="navegarGaleria(projeto, 1)"
              />
              <span
                class="absolute bottom-3 right-3 rounded-full bg-neutral-950/80 px-2.5 py-1 font-mono text-xs text-white"
                aria-live="polite"
              >
                {{ posicaoImagem(indiceAtual(projeto), projeto.imagens.length) }}
              </span>
            </template>
          </div>
          <div v-else :class="['flex aspect-video items-center justify-center bg-linear-to-bl', projeto.capa]">
            <UIcon :name="projeto.icone" class="size-12" />
          </div>
        </template>

        <template #footer>
          <ul class="flex flex-wrap gap-2">
            <li v-for="tag in projeto.tags" :key="tag">
              <UBadge
                :label="tag"
                :color="projeto.tom"
                variant="subtle"
                class="rounded-xl px-2.5 font-mono text-[11px] font-normal"
              />
            </li>
          </ul>
          <div v-if="projeto.repositorio || projeto.demo" class="mt-4 flex flex-wrap gap-x-5">
            <UButton
              v-if="projeto.demo"
              :to="projeto.demo"
              target="_blank"
              :label="t(textosProjetos.verProjeto)"
              :aria-label="rotuloLink(textosProjetos.verProjeto, projeto.titulo)"
              icon="i-lucide-external-link"
              color="neutral"
              variant="link"
              size="sm"
              class="px-0 text-muted hover:text-highlighted"
            />
            <UButton
              v-if="projeto.repositorio"
              :to="projeto.repositorio"
              target="_blank"
              :label="t(textosProjetos.verCodigo)"
              :aria-label="rotuloLink(textosProjetos.verCodigo, projeto.titulo)"
              icon="i-simple-icons-github"
              color="neutral"
              variant="link"
              size="sm"
              class="px-0 text-muted hover:text-highlighted"
            />
          </div>
        </template>
      </UPageCard>
    </div>
  </PortfolioSecao>
</template>
