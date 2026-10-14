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
