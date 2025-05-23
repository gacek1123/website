import { definePerson } from 'nuxt-schema-org/schema'

const isProduction = () => process.env.NODE_ENV === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@nuxthub/core',
    'nuxt-shiki',
    'nuxt-auth-utils',
    'nuxt-og-image',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxt/fonts',
  ],
  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    preset: 'cloudflare-pages',
    cloudflare: {
      nodeCompat: true
    },
    experimental: {
      openAPI: !isProduction()
    }
  },

  shiki: {
    bundledThemes: ["vitesse-light", "vitesse-dark"],
  },


  hub: {
    database: true,
    cache: true,
    kv: true,
  },

  build: {
    transpile: ['shiki'],
  },

  site: {
    url: 'https://www.fszarek.me',
    name: "Nei's website",
    indexable: true,
    defaultLocale: "en",
    description: "High school student from Poland, passionate about gaining knowledge and solving new problems while working on projects."
  },

  schemaOrg: {
    identity: definePerson({
      name: 'Franciszek Szarek',
      description: 'Software engineer',
      url: 'fszarek.me',
      sameAs: [
        'https://github.com/nei7'
      ],
    }),

  },

  ogImage: {
    compatibility: {
      runtime: {
        satori: "node",
        resvg: false,
        'css-inline': false,
        sharp: false,
        chromium: false,
      }
    },

    enabled: isProduction(),
    debug: true,
    fonts: ["Inter:400", 'Inter:500', "Inter:700"],
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 7 days    
      renderer: 'satori'
    },
    runtimeCacheStorage: {
      driver: 'cloudflare-kv-binding',
      binding: 'OG_IMAGE_CACHE'
    }
  },

  sitemap: {
    /*     urls: async () => {
          const pages = await getPages()
          return pages.map(page => ({
            loc: "/blog/" + page.url,
            priority: 0.5,
            lastmod: page.lastEditedTime,
            changefreq: 'monthly'
          }))
        } */
  },
  robots: {
    sitemap: ['https://www.fszarek.me/sitemap.xml']
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },

  image: {
    domains: [],

    provider: "none",
    providers: {
      cloudflareProvider: {
        name: 'cloudflare-custom',
        provider: '~/providers/cloudflare.ts',
        options: {
          baseURL: 'https://fszarek.me',
          accountHash: 'gC77PfJa-d3eBOxGPxtDxw'
        }
      }
    }
  },
})