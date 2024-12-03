<template>
  <div ref="draggedElement" data-draggable>
    <slot />
  </div>
</template>

<script setup>
import { useTemplateRef, onMounted } from 'vue'
import { dragster } from '../../core'

const draggedElement = useTemplateRef('draggedElement')

onMounted(() => {
  dragster.init(draggedElement.value)
})
</script>
