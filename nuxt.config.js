export default defineNuxtConfig({
    ssr: true,
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
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
    modules: [
        '@invictus.codes/nuxt-vuetify',
        '@sidebase/nuxt-pdf',
    ],
    vuetify: {
        /* vuetify options */
        vuetifyOptions: {
            // @TODO: list all vuetify options
        },

        moduleOptions: {
            /* nuxt-vuetify module options */
            treeshaking: true,
            useIconCDN: true,

            /* vite-plugin-vuetify options */
            styles: true,
            autoImport: true | false,
            useVuetifyLabs: true | false,
        }
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
})
