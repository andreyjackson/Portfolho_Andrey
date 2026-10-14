<script setup lang="ts">
import type { Component } from 'vue'
import { PortfolioContact, PortfolioExperience, PortfolioFormacao, PortfolioProjects, PortfolioSkills } from '#components'
import { secoes, type IdSecao } from '~/data'

// `/` mostra o site em português e `/en` em inglês; qualquer outro valor vira 404.
definePageMeta({
  scrollToTop: false,
  validate: route => !route.params.idioma || route.params.idioma === 'en',
})

// A ordem e a visibilidade das seções vêm de `data/secoes.ts`.
const componentes: Record<IdSecao, Component> = {
  skills: PortfolioSkills,
  projetos: PortfolioProjects,
  experiencia: PortfolioExperience,
  formacao: PortfolioFormacao,
  contato: PortfolioContact,
}

const visiveis = secoes.filter(secao => secao.visivel !== false)
</script>

<template>
  <div>
    <PortfolioHero />
    <component :is="componentes[secao.id]" v-for="secao in visiveis" :key="secao.id" :secao="secao" />
  </div>
</template>
