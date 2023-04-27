<script setup>
import { useWebGLStore } from '~/store/webgl'

const { $webglManager } = useNuxtApp(0)
const webglStore = useWebGLStore()

onMounted(async () => {
  await $webglManager.loadScene('liquid')
  $webglManager.activateScene('liquid')
})
</script>

<template>
  <div />
</template>
