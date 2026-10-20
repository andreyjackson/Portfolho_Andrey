<script setup lang="ts">
import { projetos, textosProjetos, type Secao } from '~/data'
import { corDoItem, tomDaCor } from '~/utils/cores'

defineProps<{ secao: Secao }>()

const { t } = useIdioma()

const itens = projetos.map((projeto, posicao) => ({
  ...projeto,
  posicao,
  tom: tomDaCor[corDoItem(projeto.cor, posicao)],
}))
const destaques = itens.filter(projeto => projeto.caso)
const demais = itens.filter(projeto => !projeto.caso)
</script>

<template>
  <PortfolioSecao :secao="secao">
    <div class="flex flex-col gap-6">
      <article
        v-for="projeto in destaques"
        :key="projeto.icone"
        class="grid overflow-hidden rounded-lg border border-default bg-elevated lg:grid-cols-5"
      >
        <div class="lg:col-span-3">
          <PortfolioProjectGallery :projeto="projeto" :posicao="projeto.posicao" class="h-full" />
        </div>

        <div class="flex flex-col gap-6 p-6 lg:col-span-2 lg:p-8">
          <div>
            <h3 class="font-display text-2xl font-semibold text-highlighted">
              {{ t(projeto.titulo) }}
            </h3>
            <p class="mt-3 text-sm/normal text-toned">
              {{ t(projeto.descricao) }}
            </p>
          </div>

          <dl v-if="projeto.caso" class="flex flex-col gap-4 border-t border-default pt-6 text-sm/normal">
            <div>
              <dt class="font-mono text-xs text-dimmed">
                {{ t(textosProjetos.problema) }}
              </dt>
              <dd class="mt-1 text-toned">
                {{ t(projeto.caso.problema) }}
              </dd>
            </div>
            <div>
              <dt class="font-mono text-xs text-dimmed">
                {{ t(textosProjetos.solucao) }}
              </dt>
              <dd class="mt-1 text-toned">
                {{ t(projeto.caso.solucao) }}
              </dd>
            </div>
            <div v-if="projeto.caso.resultado">
              <dt class="font-mono text-xs text-primary">
                {{ t(textosProjetos.resultado) }}
              </dt>
              <dd class="mt-1 font-medium text-highlighted">
                {{ t(projeto.caso.resultado) }}
              </dd>
            </div>
          </dl>

          <div class="mt-auto flex flex-col gap-4">
            <ul class="flex flex-wrap gap-2">
              <li v-for="tag in projeto.tags" :key="tag">
                <UBadge
                  :label="tag"
                  :color="projeto.tom"
                  variant="subtle"
                  class="rounded-xl px-2.5 font-mono text-[11px] font-normal"
                />
              </li>
            </ul>
            <PortfolioProjectLinks :projeto="projeto" />
          </div>
        </div>
      </article>

      <div v-if="demais.length" class="grid gap-6 md:grid-cols-2">
        <UPageCard
          v-for="projeto in demais"
          :key="projeto.icone"
          :title="t(projeto.titulo)"
          :description="t(projeto.descricao)"
          variant="outline"
          :ui="{
            root: 'overflow-hidden bg-elevated transition-colors hover:bg-accented',
            container: 'p-0 sm:p-0 gap-y-0',
            header: 'mb-0 w-full',
            body: 'px-6 pt-6',
            title: 'font-display text-xl',
            description: 'mt-3 text-sm/normal',
            footer: 'px-6 pb-6 pt-3',
          }"
        >
          <template #title>
            <h3>{{ t(projeto.titulo) }}</h3>
          </template>

          <template #header>
            <PortfolioProjectGallery :projeto="projeto" :posicao="projeto.posicao" />
          </template>

          <template #footer>
            <ul class="flex flex-wrap gap-2">
              <li v-for="tag in projeto.tags" :key="tag">
                <UBadge
                  :label="tag"
                  :color="projeto.tom"
                  variant="subtle"
                  class="rounded-xl px-2.5 font-mono text-[11px] font-normal"
                />
              </li>
            </ul>
            <PortfolioProjectLinks :projeto="projeto" class="mt-4" />
          </template>
        </UPageCard>
      </div>
    </div>
  </PortfolioSecao>
</template>
