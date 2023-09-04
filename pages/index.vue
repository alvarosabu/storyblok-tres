<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'

const story = await useAsyncStoryblok(
  'home',
  { version: 'draft' /* resolve_relations: 'car-configurator.model' */ },
  /* { resolveRelations: 'car-configurator.model' }, */
)

const gl = {
  shadows: true,
  alpha: true,
  antialias: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const progress = ref(0)
</script>

<template>
  <StoryblokComponent
    v-if="story"
    :blok="story.content"
  />

  <TresCanvas
    v-if="story.content"
    v-bind="gl"
    :clear-color="story.content.clearColor"
    window-size
  >
    <TresPerspectiveCamera
      :position="[0, 0, 15]"
    />
    <OrbitControls />
    <Suspense>
      <Moon />
    </Suspense>
    <Stars />
    <Suspense>
      <Levioso
        :speed="0.1"
        :float-factor="0.01"
        :range="[-0.1, 0.1]"
      >
        <Astronaut />
      </Levioso>
    </Suspense>
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[-4, -2, 2]"
      :intensity="1"
      cast-shadow
      color="purple"
    />
    <TresDirectionalLight
      :position="[4, 6, 4]"
      :intensity="2"
      cast-shadow
      color="cyan"
    />
  </TresCanvas>
</template>
