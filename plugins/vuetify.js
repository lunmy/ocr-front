import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {defineNuxtPlugin} from "nuxt/app";
import en from 'vuetify/lib/locale/en'
import fr from 'vuetify/lib/locale/fr'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        lang: {
            locales: { en, fr },
            current: 'fr'
        },
        icons: {
            iconfont: 'mdi'
        },
    })
    app.vueApp.use(vuetify)
})
