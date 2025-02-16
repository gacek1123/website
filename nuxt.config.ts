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

  // https://nuxt.com/docs/getting-started/styling#lcp-advanced-optimizations
  hooks: {
    'build:manifest': (manifest) => {
      // find the app entry, css list
      const css = Object.values(manifest).find(options => options.isEntry)?.css
      if (css) {
        // start from the end of the array and go to the beginning
        for (let i = css.length - 1; i >= 0; i--) {
          // if it starts with 'entry', remove it from the list
          if (css[i].startsWith('entry')) css.splice(i, 1)
        }
      }
    },
  },

  hub: {
    cache: true
  },
  build: {
    transpile: ['shiki', '@notionhq/client'],
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