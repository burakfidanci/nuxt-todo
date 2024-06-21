// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  colorMode:{
    preference: 'light'
  },

  extends: ["@nuxt/ui-pro"],

  modules: ["@nuxt/ui", "@nuxt/eslint"],

  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      dbSecret: process.env.DB_SECRET,
    },
  },
});