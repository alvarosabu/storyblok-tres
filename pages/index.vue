<script setup lang="ts">
const story = await useAsyncStoryblok(
  'home',
  { version: 'draft', /* resolve_relations: 'car-configurator.model' */ },
  /* { resolveRelations: 'car-configurator.model' }, */
)

</script>
<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
