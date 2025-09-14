import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { VApp, VMain, VBtn, VAlert, VSelect, VTextField } from 'vuetify/components'

// Импортируем основные стили Vuetify
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VApp,
      VMain,
      VBtn,
      VAlert,
      VSelect,
      VTextField,
    },
    icons: {
      defaultSet: 'mdi',
    },
    defaults: {
      global: {
        ripple: false,
      },
    },
    directives: {},
  })

  nuxtApp.vueApp.use(vuetify)
})
