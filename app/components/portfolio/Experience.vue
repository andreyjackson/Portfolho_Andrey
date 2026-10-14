<script setup lang="ts">
import { experiencia, type Secao } from '~/data'
import { classesDaCor, corDoItem } from '~/utils/cores'

defineProps<{ secao: Secao }>()

const { t } = useIdioma()

const itens = computed(() => experiencia.map((item, posicao) => ({
  ...item,
  classes: classesDaCor[corDoItem(item.cor, posicao)],
})))
</script>

<template>
  <PortfolioSecao :secao="secao">
    <ol class="flex flex-col gap-6 lg:px-[100px]">
      <li
        v-for="(item, posicao) in itens"
        :key="`${posicao}-${t(item.empresa)}`"
        class="flex flex-col gap-4 rounded-lg border border-default bg-muted p-8 md:flex-row md:gap-8"
      >
        <div class="flex items-center gap-4 md:contents">
          <span aria-hidden="true" :class="['size-3 shrink-0 rounded-full', item.classes.fundo]" />
          <span v-if="item.periodo" class="font-mono text-xs text-dimmed md:w-[140px] md:shrink-0">{{ t(item.periodo) }}</span>
          <span v-else aria-hidden="true" class="hidden md:block md:w-[140px] md:shrink-0" />
        </div>
        <div class="flex flex-1 flex-col gap-2">
          <h3 class="font-display text-lg font-semibold text-highlighted">
            {{ t(item.cargo) }}
          </h3>
          <span :class="['text-sm', item.classes.texto]">{{ t(item.empresa) }}</span>
          <p v-if="item.descricao" class="text-sm/[1.6] text-muted">
            {{ t(item.descricao) }}
          </p>
        </div>
      </li>
    </ol>
  </PortfolioSecao>
</template>
