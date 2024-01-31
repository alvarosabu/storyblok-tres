<script setup lang="ts">
import { SbRichText } from '@alvarosabu/storyblok-richtext-vue-renderer'

const props = defineProps({ blok: Object })
</script>

<template>
  <section class="min-h-screen container mx-auto flex justify-end items-center">
    <div class="w-full px-8 sm:px-0 sm:w-1/2 text-light text-right">
      <h2 class="text-6xl text-light font-extrabold mb-4">
        {{ blok.title }}
      </h2>
      <p class="bg-dark rounded bg-opacity-80 sm:bg-transparent font-italic text-2xl">
        <SbRichText :doc="blok.text" />
      </p>
    </div>
  </section>
</template>