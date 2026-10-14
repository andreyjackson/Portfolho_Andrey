<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { en, pt_br } from '@nuxt/ui/locale'
import { cabecalho, hero, idiomas, rodape, secoes, seo } from '~/data'

const { atual, idioma, t } = useIdioma()

// Textos internos do Nuxt UI (ex.: "Abrir menu" no celular) no idioma da página.
const localeUi = computed(() => idioma.value === 'en' ? en : pt_br)

const menu = computed<NavigationMenuItem[]>(() => [
  { label: t(hero.menu), to: '#sobre' },
  ...secoes
    .filter(secao => secao.visivel !== false)
    .map(secao => ({ label: t(secao.menu), to: `#${secao.id}` })),
])

const ano = String(new Date().getFullYear())

useHead({ htmlAttrs: { lang: () => atual.value.lang } })
useSeoMeta({
  title: seo.titulo,
  ogTitle: seo.titulo,
  description: () => t(seo.descricao),
  ogDescription: () => t(seo.descricao),
  ogLocale: () => atual.value.ogLocale,
})
</script>

<template>
  <UApp :locale="localeUi">
    <a
      href="#conteudo"
      class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
    >
      {{ t(cabecalho.pularConteudo) }}
    </a>

    <!-- O nome lido por leitores de tela vem de `title`; o slot mostra só as iniciais.
         `v-text` evita que o Nuxt UI use "AJ" como nome do link. -->
    <UHeader :title="t(cabecalho.rotuloLogo)" to="#sobre">
      <template #title>
        <span v-text="cabecalho.logo" />
      </template>

      <UNavigationMenu :items="menu" variant="link" color="neutral" />

      <template #right>
        <nav
          :aria-label="t(hero.seletorIdioma)"
          class="flex shrink-0 items-center gap-0.5 rounded-full border border-default bg-elevated p-0.5 font-mono text-xs"
        >
          <NuxtLink
            v-for="opcao in idiomas"
            :key="opcao.codigo"
            :to="opcao.caminho"
            :hreflang="opcao.lang"
            :lang="opcao.lang"
            :aria-label="opcao.nome"
            :title="opcao.nome"
            :aria-current="opcao.codigo === idioma ? 'page' : undefined"
            :class="[
              'rounded-full px-2 py-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              opcao.codigo === idioma ? 'bg-primary/15 text-primary' : 'text-dimmed hover:text-highlighted',
            ]"
          >
            {{ opcao.rotulo }}
          </NuxtLink>
        </nav>
        <GradientButton :to="cabecalho.botao.destino" :label="t(cabecalho.botao.rotulo)" />
      </template>

      <template #body>
        <UNavigationMenu :items="menu" orientation="vertical" variant="link" color="neutral" class="-mx-2.5" />
      </template>
    </UHeader>

    <UMain id="conteudo" tabindex="-1" class="outline-none">
      <NuxtPage />
    </UMain>

    <UFooter class="border-t border-default" :ui="{ left: 'font-mono text-xs text-dimmed', right: 'font-mono text-xs text-dimmed' }">
      <template #left>
        {{ t(rodape.esquerda).replace('{ano}', ano) }}
      </template>
      <template #right>
        {{ t(rodape.direita) }}
      </template>
    </UFooter>
  </UApp>
</template>
