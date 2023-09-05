<script setup lang="ts">
import type { Euler, Vector3 } from 'three'
import { MeshStandardMaterial } from 'three'

const props = defineProps<{
  uuid?: string
  progress?: number
  position?: Vector3
  rotation?: Euler
}>()

const { position, rotation, progress, uuid } = toRefs(props)

const { nodes } = await useGLTF('/models/rocket.glb', { draco: true })

const rocketAccent = nodes['RocketAccent']
const rocketBase = nodes['RocketBase']
const rocketDetail = nodes['RocketDetail']
const rocketWindow = nodes['RocketWindow']

const rocketRef = ref()

const state = useProductConfigurator()

watch(
  () => state.value.selectedBaseMaterial,
  (selectedBaseMaterial) => {
    if (!selectedBaseMaterial) return
    rocketBase.material = new MeshStandardMaterial({
      color: selectedBaseMaterial.color,
    })
  },
  { immediate: true },
)

watch(
  () => state.value.selectedAccentMaterial,
  (selectedAccentMaterial) => {
    if (!selectedAccentMaterial) return

    rocketAccent.material = new MeshStandardMaterial({
      color: selectedAccentMaterial.color,
    })
  },
  { immediate: true },
)

watch(
  () => state.value.selectedDetailMaterial,
  (selectedDetailMaterial) => {
    if (!selectedDetailMaterial) return

    rocketDetail.material = new MeshStandardMaterial({
      color: selectedDetailMaterial.color,
    })
  },
  { immediate: true },
)

const unwatch = watch(rocketRef, (value) => {
  if (!value) return

  useControls('TransformControls', {
    position: value.position,
    rotation: value.rotation,
  })

  unwatch()
})

watchEffect(() => {
  if (!rocketRef.value) return
})

watch(progress, (value) => {
  if (value >= 0.65) {
    rocketRef.value.rotation.x = lerp(0, Math.PI + Math.PI / 2, (value - 0.65) * 15)
  }
  if (value >= 0.72) {
    rocketRef.value.position.x = lerp(20, 40, (value - 0.72) * 11)
  }
})

/* const { value: mode} = useControls({
  label: 'mode',
  options: [{ text: 'Translate', value: 'translate' }, { text: 'Rotate', value: 'rotate' }],

  value: 'translate',
}) */
</script>

<template>
  <TresGroup
    ref="rocketRef"
    :position="position"
    :rotation="rotation"
  >
    <primitive :object="rocketAccent" />
    <primitive :object="rocketBase" />
    <primitive :object="rocketDetail" />
    <primitive :object="rocketWindow" />
  </TresGroup>
  <!-- <TransformControls
    v-if="rocketRef"
    :mode="'translate'"
    :object="rocketRef"
  /> -->
</template>