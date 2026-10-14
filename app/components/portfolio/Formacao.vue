<script setup lang="ts">
import { cursos, graduacoes, textosFormacao, type Secao, type Texto } from '~/data'

defineProps<{ secao: Secao }>()

const { t } = useIdioma()

/** Um ano vira "Concluído em 2025"; outro texto (ex.: "Cursando") aparece como está. */
function conclusao(texto: Texto) {
  const valor = t(texto)
  return /^\d{4}$/.test(valor) ? `${t(textosFormacao.concluidoEm)} ${valor}` : valor
}
</script>

<template>
  <PortfolioSecao :secao="secao">
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="flex flex-col gap-6">
        <div
          v-for="graduacao in graduacoes"
          :key="t(graduacao.curso)"
          class="flex flex-col gap-3 rounded-lg border border-default bg-muted p-8"
        >
          <div class="flex size-12 items-center justify-center rounded-lg bg-linear-to-bl from-primary/12 to-secondary/12">
            <UIcon name="i-lucide-graduation-cap" class="size-[22px] text-primary" />
          </div>
          <h3 class="font-display text-lg font-semibold text-highlighted">
            {{ t(graduacao.curso) }}
          </h3>
          <span class="text-sm text-primary">{{ t(graduacao.instituicao) }}</span>
          <span class="font-mono text-xs text-dimmed">
            {{ conclusao(graduacao.conclusao) }}
          </span>
        </div>
      </div>

      <div v-if="cursos.length" class="rounded-lg border border-default bg-muted p-8">
        <h3 class="font-display text-lg font-semibold text-highlighted">
          {{ t(textosFormacao.cursos) }}
        </h3>
        <ul class="mt-5 flex flex-col divide-y divide-default">
          <li
            v-for="curso in cursos"
            :key="t(curso.nome)"
            class="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <span class="text-sm text-muted">{{ t(curso.nome) }}</span>
            <UBadge
              :label="t(curso.ano)"
              color="neutral"
              variant="soft"
              class="shrink-0 rounded-full bg-elevated px-3 font-mono text-[11px] font-normal text-dimmed"
            />
          </li>
        </ul>
      </div>
    </div>
  </PortfolioSecao>
</template>
