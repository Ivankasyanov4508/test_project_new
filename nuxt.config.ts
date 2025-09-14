export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  build: {
    transpile: ['vuetify'],
  },
  css: ['vuetify/styles', '@/assets/styles/main.scss'],
  plugins: ['~/plugins/vuetify.ts', '~/plugins/pinia-persist.client.ts'],
  typescript: {
    strict: true,
    typeCheck: true,
  },
})
