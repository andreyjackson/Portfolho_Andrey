<script setup lang="ts">
import { skills, type Secao } from '~/data'

defineProps<{ secao: Secao }>()

const { t } = useIdioma()
</script>

<template>
  <PortfolioSecao :secao="secao">
    <UPageGrid class="gap-5 lg:grid-cols-4 lg:gap-5">
      <UPageCard
        v-for="grupo in skills"
        :key="grupo.icone"
        :title="t(grupo.titulo)"
        variant="outline"
        :ui="{
          root: 'bg-muted',
          container: 'p-8 sm:p-8',
          leading: 'mb-5',
          title: 'font-display text-xl',
          body: 'flex-none',
          footer: 'mt-0 pt-5',
        }"
      >
        <template #title>
          <h3>{{ t(grupo.titulo) }}</h3>
        </template>

        <template #leading>
          <div class="flex size-12 items-center justify-center rounded-lg bg-linear-to-bl from-primary/12 to-secondary/12">
            <UIcon :name="grupo.icone" class="size-[22px] text-primary" />
          </div>
        </template>

        <template #footer>
          <ul class="flex flex-wrap gap-2">
            <li v-for="item in grupo.itens" :key="t(item)">
              <UBadge
                :label="t(item)"
                color="neutral"
                variant="soft"
                size="lg"
                class="rounded-full bg-elevated px-3.5 py-1.5 font-mono text-xs font-normal text-muted"
              />
            </li>
          </ul>
        </template>
      </UPageCard>
    </UPageGrid>
  </PortfolioSecao>
</template>
