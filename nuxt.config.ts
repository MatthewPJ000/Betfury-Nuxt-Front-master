
import { NuxtConfig } from '@nuxt/types';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss', 
        'nuxt-quasar-ui',
    ],
    runtimeConfig: {
        public: {
          API_KEY: 'Sy5WMUIbIV6m3IBk1PSL',
        },
    },
    quasar: {
        plugins: [
            'BottomSheet',
            'Dialog',
            'Loading',
            'LoadingBar',
            'Notify',
            'Dark',
        ],
        extras: {
            font: 'roboto-font',
            fontIcons: [  
                'material-icons'
            ],
        },
    },
    css: ['@/assets/app.css'],
    resolve: {
        '@assets': '~/assets',
    },
});
