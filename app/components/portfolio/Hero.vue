<script setup lang="ts">
import { hero, numeros, perfil } from '~/data'

const { t } = useIdioma()
</script>

<template>
  <UPageHero
    id="sobre"
    :title="perfil.nome"
    :description="t(perfil.resumo)"
    :ui="{
      container: 'py-20 sm:py-24 lg:pt-[120px] lg:pb-[100px]',
      headline: 'mb-8 flex justify-center',
      title: 'font-display leading-[1.05]',
      description: 'mx-auto mt-8 max-w-[640px] text-wrap',
      footer: 'mt-8',
    }"
  >
    <template #top>
      <div
        aria-hidden="true"
        class="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[300px] w-[600px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,--alpha(var(--ui-primary)/19%),transparent)]"
      />
    </template>

    <template #footer>
      <p class="mb-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs text-dimmed">
        <UIcon name="i-lucide-map-pin" class="size-3.5" />
        <span>{{ t(perfil.localizacao) }}</span>
        <span aria-hidden="true" class="text-muted">·</span>
        <span>{{ t(perfil.disponibilidade) }}</span>
      </p>

      <div class="flex flex-wrap justify-center gap-4">
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

      <dl v-if="numeros.length" class="mt-10 flex justify-center gap-6 pt-10 sm:gap-16">
        <div v-for="numero in numeros" :key="numero.valor" class="flex flex-col-reverse items-center justify-end gap-1">
          <dt class="text-[13px] text-dimmed">
            {{ t(numero.rotulo) }}
          </dt>
          <dd class="font-display text-4xl font-bold text-primary">
            {{ numero.valor }}
          </dd>
        </div>
      </dl>
    </template>
  </UPageHero>
</template>
