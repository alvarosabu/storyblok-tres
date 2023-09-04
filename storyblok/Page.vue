<script setup lang="ts">
defineProps({ blok: Object })
</script>

<template>
  <div
    v-editable="blok"
    class="pt-22"
  >
    <StoryblokComponent
      v-for="inblok in blok?.body"
      :key="inblok._uid"
      :blok="inblok"
    />
  </div>
</template>
