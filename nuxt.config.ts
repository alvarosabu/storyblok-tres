// https://nuxt.com/docs/api/configuration/nuxt-config
import { presetUno, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import svgPlugin from 'vite-plugin-svg'

export default defineNuxtConfig({
  modules: [
    '@tresjs/nuxt', 
    '@unocss/nuxt',
    [
      '@storyblok/nuxt', { 
        accessToken: import.meta.env.STORYBLOK_TOKEN, 
      },
    ],
  ],
  css: ['@unocss/reset/tailwind.css', '@tresjs/leches/styles'],
  ssr: false,
  unocss: {
    presets: [presetUno(), presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        // ...
      },
    }), presetDaisy() ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
  },
  vite: {
    plugins: [svgPlugin()],
    resolve: {
      dedupe: ['three'],
    },
  },
})
