import { createConfigForNuxt } from '@nuxt/eslint-config'

export default createConfigForNuxt({
  files: ['**/*.ts', '**/*.js', '**/*.vue'],
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  globals: {
    defineNuxtPlugin: 'readonly',
    defineNuxtConfig: 'readonly',
    defineStore: 'readonly',
    ref: 'readonly',
    readonly: 'readonly',
  },
})
