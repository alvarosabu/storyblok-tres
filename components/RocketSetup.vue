<script setup lang="ts">
import { MeshStandardMaterial } from 'three'

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
    if(!selectedBaseMaterial) return
    rocketBase.material = new MeshStandardMaterial({
      color: selectedBaseMaterial.color,
    })
  },
  { immediate: true },
)

watch(
  () => state.value.selectedAccentMaterial,
  (selectedAccentMaterial) => {
    if(!selectedAccentMaterial) return

    rocketAccent.material = new MeshStandardMaterial({
      color: selectedAccentMaterial.color,
    })
  },
  { immediate: true },
)

watch(
  () => state.value.selectedDetailMaterial,
  (selectedDetailMaterial) => {
    if(!selectedDetailMaterial) return

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
</script>

<template>
  <TresGroup
    ref="rocketRef"
  >
    <primitive :object="rocketAccent" />
    <primitive :object="rocketBase" />
    <primitive :object="rocketDetail" />
    <primitive :object="rocketWindow" />
  </TresGroup>
</template>