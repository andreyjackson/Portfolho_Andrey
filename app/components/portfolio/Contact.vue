<script setup lang="ts">
import { infosContato, linksContato, novaAba, type Secao } from '~/data'

defineProps<{ secao: Secao }>()

const { t } = useIdioma()

const externo = (url: string) => url.startsWith('http')
</script>

<template>
  <PortfolioSecao
    :secao="secao"
    :ui="{
      headline: 'mb-10',
      title: 'sm:text-[44px] lg:text-[44px]',
      description: 'mx-auto mt-10 max-w-[560px] text-lg sm:text-lg',
      footer: 'mt-10 sm:mt-10 flex flex-col items-center gap-10',
    }"
  >
    <template #top>
      <div
        aria-hidden="true"
        class="pointer-events-none absolute top-5 left-1/2 -z-10 h-[250px] w-[500px] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,--alpha(var(--ui-success)/12%),transparent)]"
      />
    </template>

    <template #footer>
      <dl v-if="infosContato.length" class="flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-xs text-dimmed">
        <div v-for="info in infosContato" :key="info.icone" class="flex items-center gap-2">
          <dt class="sr-only">
            {{ t(info.descricao) }}
          </dt>
          <UIcon :name="info.icone" class="size-3.5" />
          <dd>{{ t(info.texto) }}</dd>
        </div>
      </dl>

      <div class="flex flex-wrap justify-center gap-4">
        <UButton
          v-for="link in linksContato"
          :key="link.url"
          :to="link.url"
          :target="externo(link.url) ? '_blank' : undefined"
          :label="t(link.rotulo)"
          :aria-label="externo(link.url) ? `${t(link.rotulo)} (${t(novaAba)})` : undefined"
          :icon="link.icone"
          color="neutral"
          variant="outline"
          size="lg"
          class="bg-elevated px-6 font-normal text-highlighted hover:bg-accented"
          :ui="{ leadingIcon: 'text-muted' }"
        />
      </div>
    </template>
  </PortfolioSecao>
</template>
