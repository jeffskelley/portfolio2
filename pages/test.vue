<script setup>
import { useWebGLStore } from '~/store/webgl'

const { $webglManager } = useNuxtApp(0)
const webglStore = useWebGLStore()

watchEffect(async () => {
  if (webglStore.isInitialized) {
    await $webglManager.loadScene('ball')
    $webglManager.activateScene('ball')
  }
})
</script>

<template>
  <div />
</template>
