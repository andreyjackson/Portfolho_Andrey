// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // Os templates juntam atributos curtos na mesma linha; quebrar um por linha deixaria os componentes longos demais.
    'vue/max-attributes-per-line': 'off',
  },
})
