<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3, Euler } from 'three'
import { Levioso, OrbitControls } from '@tresjs/cientos'
import { interpolate } from '../utils/animation'

const story = await useAsyncStoryblok(
  'exploring',
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
const scRef = ref()
const cameraRef = ref()

useControls('fpsgraph')
useControls('ScrollControls', {
  progress,
})

const moonRocketRef = ref()
const rocketPosition = ref(new Vector3(20, -4, 0))
const rocketRotation = ref(new Euler(0, 0, -Math.PI / 2))

useControls('RocketControls', {
  rocketPosition,
  rocketRotation,
})
const unwatch = watch(moonRocketRef, (value) => {
  if (!value) return

  useControls('MoonControls', {
    /*  position: value.position, */
    moonRot: value.rotation,
  })

  /*  useControls('cameraRef', {
    camera: cameraRef.value.rotation,
  }) */

  unwatch()
})

watch(progress, (value) => {
  console.log(value)
  if (value >= 0.40) {
    const t = (progress.value - 0.40) * 4 // Normalize progress from 0.5 to 1 to range 0 to 1
    cameraRef.value.position.x = lerp(0, 15, t * t) // Smoothly interpolate from -0.5 to 1 based on t
  }
})
</script>

<template>
  <!-- <TresLeches class="important-z-44 important-fixed" /> -->
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
      ref="cameraRef"
      :position="[0, 0, 15]"
    />
    <ScrollControls
      ref="scRef"
      v-model="progress"
      :distance="progress < 0.65 ? 10 : 4"
      :smooth-scroll="0.1"
      html-scroll
    >
      <Levioso
        :speed="0.1"
        :float-factor="0.01"
        :range="[-0.1, 0.1]"
      >
        <Suspense>
          <Astronaut />
        </Suspense>
      </Levioso>
    </ScrollControls>
    <Suspense>
      <Moon :progress="progress" />
    </Suspense>
    <Suspense>
      <Rocket
        uuid="rocket-flying"
        :position="rocketPosition"
        :rotation="rocketRotation"
        :progress="progress"
      />
    </Suspense>
    <Stars />
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
