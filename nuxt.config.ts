import glsl from 'vite-plugin-glsl'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  build: {
    transpile: ['three', 'gsap'],
  },
  css: [
    '@/styles/global.scss',
  ],
  vite: {
    plugins: [glsl()]
  }
})
