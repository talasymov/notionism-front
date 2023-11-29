// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: true,

    routeRules: {
        // '/blog/*': {swr: true},
        // '/template/*': {swr: true},
        '/admin/**': {ssr: false},
        '/dashboard/**': {ssr: false},
        '/login': {ssr: false},
        '/widgets/embed/**': {ssr: false},
        // '/': {swr: true},
        // '/template-library': {swr: true},
    },

    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://localhost:8000/'
        }
    },

    css: ['~/assets/css/main.css', '~/assets/scss/main.scss'],

    plugins: [
        '~/plugins/index.js'
    ],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    modules: [
        '@vueuse/nuxt',
        ['@pinia/nuxt',
            {
                autoImports: [
                    // automatically imports `defineStore`
                    'defineStore', // import { defineStore } from 'pinia'
                    // automatically imports `defineStore` as `definePiniaStore`
                    ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
                ],
            },
        ],
    ],
})
