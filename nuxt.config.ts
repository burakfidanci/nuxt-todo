// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  colorMode: {
    preference: "light",
  },

  components: true,
  ssr: false,

  extends: ["@nuxt/ui-pro"],

  modules: ["@nuxt/ui", "@nuxt/eslint"],

  plugins: ["~/plugins/axios"],

  app: {
    head: {
      title: "Todo App",
      meta: [{ name: "description", content: "This is my todo application" }],
    },
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      dbSecret: process.env.DB_SECRET,
    },
  },
});
