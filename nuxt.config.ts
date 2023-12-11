// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "Powerful Questions: %s",
      htmlAttrs: {
        lang: "en"
      },
      bodyAttrs: {
        class: ["body"]
      },
      meta: [
        { charset: "utf-8" },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: "description",
          content: "Powerful Questions.",
        }
      ]
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss', 'nuxt-vitest'
  ],
  runtimeConfig: {// availabe only server side
    openAIKey: process.env.OPENAIKEY,
    mongoURI: process.env.MONGOURI,
    mongoDB: process.env.MONGODB,
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    // Public keys that are exposed to the client
    public: {
      siteUrl: 'https://powerful-questions.com',
    },
  }
})
