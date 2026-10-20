<!-- Cabeçalho e moldura comuns às seções. O texto vem de `data/secoes.ts`. -->
<script setup lang="ts">
import type { PageSectionProps } from '@nuxt/ui'
import type { Secao } from '~/data'
import { classesDaCor } from '~/utils/cores'

const props = defineProps<{
  secao: Secao
  ui?: PageSectionProps['ui']
}>()

const { t } = useIdioma()

// Revelar ao rolar: só esconde o que ainda está abaixo da tela, então o conteúdo nunca pisca no carregamento
// nem some sem JavaScript. Quem pede menos movimento no sistema vê tudo desde o início.
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const alvo = document.getElementById(props.secao.id)?.firstElementChild
  if (!alvo || alvo.getBoundingClientRect().top < window.innerHeight) return

  alvo.classList.add('revelar')
  const observador = new IntersectionObserver(([entrada]) => {
    if (!entrada?.isIntersecting) return
    alvo.classList.add('revelar-visivel')
    observador.disconnect()
  }, { threshold: 0.08 })
  observador.observe(alvo)
  onBeforeUnmount(() => observador.disconnect())
})

const ui = computed(() => ({
  ...props.ui,
  headline: [classesDaCor[props.secao.cor].texto, props.ui?.headline].filter(Boolean).join(' '),
}))
</script>

<template>
  <UPageSection
    :id="secao.id"
    :headline="t(secao.rotulo)"
    :title="t(secao.titulo)"
    :description="secao.descricao && t(secao.descricao)"
    :class="{ 'bg-section': secao.fundoDestacado }"
    :ui="ui"
  >
    <template v-for="(_, nome) in $slots" #[nome]="dados">
      <slot :name="nome" v-bind="dados ?? {}" />
    </template>
  </UPageSection>
</template>
