import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import {defineNuxtPlugin} from "nuxt/app";

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        // ... your configuration
    })
    app.vueApp.use(vuetify)
})
