<script setup lang="ts">
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Vector3 } from 'three'
import gsap from 'gsap'

import { OrbitControls } from '@tresjs/cientos'

const gl = {
  clearColor: '#181C3E',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const story = await useAsyncStoryblok(
  'product-custom',
  { version: 'draft' /* resolve_relations: 'car-configurator.model' */ },
  /* { resolveRelations: 'car-configurator.model' }, */
)

const state = useProductConfigurator()

const availableBaseMaterials = computed(() => {
  if (story.value.content && story.value.content.baseMaterial.availableMaterials) {
    return story.value.content.baseMaterial.availableMaterials.map((material, index) => ({
      id: index,
      ...material,
    }))
  }
  return []
})

const availableAccentMaterials = computed(() => {
  if (story.value.content && story.value.content.accentMaterial.availableMaterials) {
    return story.value.content.accentMaterial.availableMaterials.map((material, index) => ({
      id: index,
      ...material,
    }))
  }
  return []
})

const availableDetailMaterials = computed(() => {
  if (story.value.content && story.value.content.detailMaterial.availableMaterials) {
    return story.value.content.detailMaterial.availableMaterials.map((material, index) => ({
      id: index,
      ...material,
    }))
  }
  return []
})

const { hasFinishLoading, progress, items } = await useProgress()

const cameraRef = ref()
const cameraPosition = ref(new Vector3(-0.63, 2, 0.63))

watch(hasFinishLoading, (hasFinishLoading) => {
  if (!cameraRef.value || !hasFinishLoading) return
  gsap.to(cameraRef.value.position, {
    duration: 4,
    x: 0,
    y: 2,
    z: 5,
    ease: 'power2.inOut',
    onUpdate: () => {
      cameraRef.value.lookAt(0, 1, 0)
    },
  })
})

function resetMaterials() {
  state.value.selectedBaseMaterial = {
    color: '#ffffff',
  }
  state.value.selectedAccentMaterial = {
    color: '#E73740',
  }
  state.value.selectedDetailMaterial = {
    color: '#563EE7',
  }
}
</script>

<template>
  <div class="pt-56px flex flex-col sm:flex-row h-100vh">
    <div class="w-full sm:w-1/2 h-50% sm:h-100% relative">
      <Transition
        name="fade-overlay"
        enter-active-class="opacity-1 transition-opacity duration-200"
        leave-active-class="opacity-0 transition-opacity duration-200"
      >
        <div
          v-show="!hasFinishLoading"
          class="absolute bg-black t-0 l-0 w-full h-full z-30 flex justify-center items-center text-white font-mono"
        >
          <div class="font-italic title w-200px">
            Building Rocket 🚀... {{ progress }} %
          </div>
        </div>
      </Transition>
      <TresCanvas
        v-if="story"
        v-bind="gl"
      >
        <TresPerspectiveCamera
          ref="cameraRef"
          :position="cameraPosition"
        />
        <OrbitControls />
        <Suspense>
          <RocketSetup />
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
        <TresGridHelper />
        <TresAmbientLight :intensity="1" />
      </TresCanvas>
    </div>
    <aside class="relative w-full sm:w-1/2 bg-dark prose p-8 sm:p-16 h-full overflow-scroll text-white">
      <h1
        class=" font-bold text-2xl mb-12 w-full text-center"
      >
        {{ story.content.title }}
      </h1>
      <p class="text-gray-400 text-sm text-center">
        {{ story.content.description }}
      </p>
      <section class="w-full flex items-start text-gray-300 mt-32 mb-16">
        <h2 class="text-gray-300 font-bold w-1/2 lg:w-1/3">
          Base Color
        </h2>
        <ul class="flex flex-wrap list-none justify-start w-1/2 lg:2/3 ml-0 pl-0">
          <li
            v-for="(material, index) in availableBaseMaterials"
            :key="index"
          >
            <div
              class="color-btn"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedBaseMaterial = material"
            />
          </li>
        </ul>
      </section>
      <section class="w-full flex items-start text-gray-300 mb-16">
        <h2 class="text-gray-300 font-bold w-1/2 lg:w-1/3">
          Accent Color
        </h2>
        <ul class="flex flex-wrap list-none justify-start w-1/2 lg:2/3 ml-0 pl-0">
          <li
            v-for="(material, index) in availableAccentMaterials"
            :key="index"
          >
            <div
              class="color-btn"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedAccentMaterial = material"
            />
          </li>
        </ul>
      </section>
      <section class="w-full flex items-start text-gray-300 mb-16">
        <h2 class="text-gray-300 font-bold w-1/2 lg:w-1/3">
          Detail Color
        </h2>
        <ul class="flex flex-wrap list-none justify-start w-1/2 lg:2/3 ml-0 pl-0">
          <li
            v-for="(material, index) in availableDetailMaterials"
            :key="index"
          >
            <div
              class="color-btn"
              :style="{ backgroundColor: material.color }"
              @click="state.selectedDetailMaterial = material"
            />
          </li>
        </ul>
      </section>
      <footer class="flex flex-col sm:flex-row justify-end gap-8 w-full p-0 sm:p-8">
        <button
          class="btn btn-outline btn-white text-white font-bold py-2 px-4 rounded"
          @click="resetMaterials"
        >
          Reset <i class="i-carbon-reset ml-3" />
        </button>
        <NuxtLink
          class="btn btn-white text-dark font-bold py-2 px-4 rounded"
          to="/exploring"
        >
          Start Exploring
        </NuxtLink>
      </footer>
    </aside>
  </div>
</template>

<style>
.color-btn {
  @apply rounded-full border border-2 border-solid border-blue;
  @apply w-8 h-8 lg:w-10 lg:h-10 shadow-md mr-4 inline-block cursor-pointer;
}
</style>