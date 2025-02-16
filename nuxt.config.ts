import { getPages } from "./lib/notion"
import { definePerson } from 'nuxt-schema-org/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/seo',
    'nuxt-og-image',
    '@nuxthub/core'
  ],


  hub: {
    cache: true
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
    debug: true,
    fonts: ["Inter:400", 'Inter:500', "Inter:700"],
    defaults: {
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
    }
  },

  sitemap: {
    // urls: async () => {
    //   const pages = await getPages()
    //   return pages.map(page => ({
    //     loc: "/blog/" + page.url,
    //     priority: 0.5,
    //     lastmod: page.lastEditedTime,
    //     changefreq: 'monthly'
    //   }))
    // }
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
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900]
    }
  },
  image: {

  }
})