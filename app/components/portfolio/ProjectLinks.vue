<!-- Links "Ver projeto" e "Ver código" de um projeto. -->
<script setup lang="ts">
import { novaAba, textosProjetos, type Projeto, type Texto } from '~/data'

defineProps<{ projeto: Projeto }>()

const { t } = useIdioma()

/** Nome completo do link para leitores de tela, ex.: "Ver código: Vigia (abre em nova aba)". */
const rotuloLink = (acao: Texto, projeto: Texto) => `${t(acao)}: ${t(projeto)} (${t(novaAba)})`
</script>

<template>
  <div v-if="projeto.repositorio || projeto.demo" class="flex flex-wrap gap-x-5">
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
