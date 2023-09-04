<script setup lang="ts">
import { RichTextRenderer } from '@marvr/storyblok-rich-text-vue-renderer'

defineProps({ blok: Object })

const modalRef = ref()

const openModal = () => {
  modalRef.value.showModal()
}

onMounted(() => {
  openModal()
})
</script>

<template>
  <dialog
    ref="modalRef"
    class="modal"
  >
    <form
      method="dialog"
      class="modal-box bg-dark text-white"
    >
      <h3 class="font-bold text-lg">
        {{ blok.title }}
      </h3>
      <p class="py-4">
        <RichTextRenderer :document="blok.content" />
      </p>
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <NuxtLink
          class="btn btn-primary"
          to="product-custom"
        >
          {{ blok.ctaLabel }}
        </NuxtLink>
      </div>
    </form>
  </dialog>
</template>