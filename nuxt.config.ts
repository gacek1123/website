import { getPages } from "./lib/notion"

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
    'nuxt-shiki',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-site-config',

  ],
  shiki: {
    bundledLangs: ["yaml", "shell", "python", "py"],
    bundledThemes: ['vitesse-light', 'vitesse-dark'],

  },
  site: {
    url: 'https://fszarek.me',
    name: '',
  },

  sitemap: {
    urls: async () => {
      const pages = await getPages()
      return pages.map(page => ({
        loc: page.url,
        priority: 0.5,
        lastmod: page.createdAt,
        changefreq: 'monthly'
      }))
    }
  },
  robots: {
    blockNonSeoBots: true,
    disallow: "",
    sitemap: ['https://fszarek.me/sitemap.xml']
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