<script setup lang="ts">
import { Euler, MeshStandardMaterial, Vector3 } from 'three'
import { lerp } from '../utils/animation'

const props = defineProps<{ progress?: number }>()
const { progress } = toRefs(props)

const rocketPosition = ref(new Vector3(-1.20, -7.80, -4))
const rocketRotation = ref(new Euler(0, 2.10, -2.20))

const { nodes } = await useGLTF('/models/moon.glb', { draco: true })

const groupRef = ref()

const model = nodes['Moon']
const bakedDisplacementTexture = await useTexture(['/models/moon_displacement.png'])
bakedDisplacementTexture.flipY = false

const material = new MeshStandardMaterial({
  color: '#DDDBE7',
  map: bakedDisplacementTexture,
  displacementMap: bakedDisplacementTexture,
  displacementScale: 0.2,
  displacementBias: -0.1,
})
model.material = material

watch(progress, (value) => {
  if (value >= 0.2 && value < 0.4) {
    groupRef.value.rotation.y = lerp(0, - Math.PI, (value - 0.2) / 0.3)
  }
})

const unwatch = watch(groupRef, (value) => {
  if (!value) return

  useControls('Moon', {
    moonPosition: value.position,
    moonRotation: value.rotation,
  })

  unwatch()
})
</script>

<template>
  <TresGroup
    ref="groupRef"
    name="Moon"
    :position="[-4, 0, 1]"
    :rotation="[0, 0, 0]"
  >
    <primitive :object="model" />
    <Suspense>
      <Rocket
        :position="rocketPosition"
        :rotation="rocketRotation"
      />
    </Suspense>
  </TresGroup>
</template>