import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'


import { createVuetify } from 'vuetify'
import {defineNuxtPlugin} from "nuxt/app";
import en from 'vuetify/lib/locale/en'
import fr from 'vuetify/lib/locale/fr'

/* Add all components and directives, for dev & prototyping only. */
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

/* Add build-in icon used internally in various components */
/* Described in https://next.vuetifyjs.com/en/features/icon-fonts/ */
import { mdi, aliases as allAliases } from 'vuetify/iconsets/mdi-svg';
const aliases = allAliases;


export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        lang: {
            locales: { en, fr },
            current: 'fr'
        },
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: { mdi }
        }
    })
    app.vueApp.use(vuetify)
})
