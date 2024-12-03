<template>
  <div data-dropzone :data-items="props.items" draggable="false">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Object,
    default: null,
  },
})
</script>
