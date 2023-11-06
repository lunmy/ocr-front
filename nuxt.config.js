// Translations provided by Vuetify
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import {fr} from 'vuetify/locale'

export default defineNuxtConfig({
    ssr: true,
    lang: 'fr',
    runtimeConfig: {
        public: {
            apiAuthUrl: process.env.BASE_API_AUTH_URL,
            apiCrmUrl: process.env.BASE_API_CRM_URL,
            applicationId: process.env.APPLICATION_ID,
        },
    },

    devtools: {enabled: true},
    plugins: [],
    css: [
        '@mdi/font/css/materialdesignicons.min.css',
        '@/assets/css/main.scss',
    ],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'OCR App',
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['vuetify'],
        postcss: false,
    },
    modules: [
        (_options, nuxt) => {
            nuxt.hooks.hook('vite:extendConfig', (config) => {
                // @ts-expect-error
                config.plugins.push(vuetify({ autoImport: true }))
            })
        },
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
    ],
    vite: {
        optimizeDeps: { exclude: ["fsevents"] },
        define: {
            'process.env.DEBUG': false,
        },
        ssr: {
            noExternal: ["vuetify"],
        },
        vue: {
            template: {
                transformAssetUrls,
            },
        },
    },
})
