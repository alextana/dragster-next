<script setup>
import { ref } from 'vue'
import Draggable from '../../../vue/components/Draggable.vue'
import Dropzone from '../../../vue/components/Dropzone.vue'
import HelloWorld from './components/HelloWorld.vue'

const items = ref([
  {
    id: 1,
    name: 'hello',
  },
  {
    id: 2,
    name: 'test',
  },
  {
    id: 3,
    name: 'haaaaah',
  },
])

const otherItems = ref([
  {
    id: 4,
    name: 'oioi',
  },
  {
    id: 5,
    name: 'bluey',
  },
])
</script>

<template>
  <Dropzone :items="items">
    <Draggable v-for="item in items" :key="item.id">
      <div class="el">{{ item.name }}</div>
    </Draggable>
  </Dropzone>

  <Dropzone :items="otherItems">
    <Draggable v-for="item in otherItems" :key="item.id">
      <div class="el">{{ item.name }}</div>
    </Draggable>
  </Dropzone>
</template>

<style scoped>
[data-dropzone] {
  margin: 2rem;
}

.el {
  padding: 2rem;
  border: 1px solid white;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
