import { auth, naiveui, tailwindcss, s3, pwa } from './config'

export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: false },

  app: {
    head: {
      title: 'ESP Admin',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap'
        }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  css: ['~/assets/styles/main.css'],

  modules: [
    '@bg-dev/nuxt-auth',
    '@bg-dev/nuxt-naiveui',
    '@nuxtjs/tailwindcss',
    'nuxt-s3',
    'nuxt-security',
    '@vite-pwa/nuxt'
  ],

  auth,
  naiveui,
  tailwindcss,
  s3,
  pwa,

  security: {
    corsHandler: {
      origin: process.env.NUXT_SECURITY_CORS_HANDLER_ORIGIN,
      methods: '*'
    },
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        'img-src': [
          "'self'",
          'data:',
          'blob:',
          'https://*.googleusercontent.com',
          'https://ui-avatars.com',
          'https://www.googletagmanager.com',
          'https://avatars.githubusercontent.com'
        ]
      }
    }
  },

  routeRules: {
    '/api/s3/query/**': { isr: true },
    '/api/s3/mutation/**': {
      security: {
        xssValidator: false
      }
    }
  },

  runtimeConfig: {
    public: {
      oauth: {
        google: false,
        github: false
      },
      bugsnag: {
        enabled: false,
        apiKey: '*'
      }
    }
  }
})
