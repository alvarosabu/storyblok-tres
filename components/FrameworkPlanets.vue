<script setup lang="ts">
const { nodes: reactNodes } = await useGLTF('/models/react-planet.glb', { draco: true })
const reactPlanet = reactNodes['ReactPlanet']

reactPlanet.position.y = 4
reactPlanet.position.x = reactPlanet.position.x - 4

const { nodes: svelteNodes } = await useGLTF('/models/svelte-planet.glb', { draco: true })
const sveltePlanet = svelteNodes['SveltePlanet']

sveltePlanet.position.y = -3
sveltePlanet.position.x = sveltePlanet.position.x - 2

const { scene: vuePlanet } = await useGLTF('/models/evan.glb', { draco: true })

vuePlanet.position.y = 3.5
vuePlanet.scale.set(0.75, 0.75, 0.75)
vuePlanet.position.x = vuePlanet.position.x + 8
vuePlanet.rotation.set(Math.PI / 12, -Math.PI / 6, 0)

const { nodes: vrHeadsetNodes } = await useGLTF('/models/vr-headset.glb', { draco: true })
const vrHeadset = vrHeadsetNodes['VRHeadset']

vrHeadset.position.y = -3
vrHeadset.position.x = vrHeadset.position.x + 4
</script>

<template>
  <TresGroup :position="[80, -5, 0]">
    <Levioso
      :speed="1"
      :float-factor="0.1"
      :range="[-0.1, 0.1]"
    >
      <primitive :object="reactPlanet" />
    </Levioso>
    <Levioso
      :speed="1"
      :float-factor="0.1"
      :range="[-0.1, 0.1]"
    >
      <primitive :object="sveltePlanet" />
    </Levioso>
    <Levioso
      :speed="1"
      :float-factor="0.1"
      :range="[-0.1, 0.1]"
    >
      <primitive :object="vuePlanet" />
    </Levioso>
    <Levioso
      :speed="1"
      :float-factor="0.1"
      :range="[-0.1, 0.1]"
    >
      <primitive :object="vrHeadset" />
    </Levioso>
  </TresGroup>
</template>