<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';

defineProps({ blok: Object })


</script>
<template>
  <div v-editable class="w-full aspect-video">
    <TresCanvas v-if="blok" :clear-color="blok.clearColor">
    
    </TresCanvas>
  </div>
</template>