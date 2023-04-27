<script setup>
import { useWebGLStore } from '~/store/webgl'

const { $webglManager } = useNuxtApp(0)

const data = reactive({
  sections: [
    {
      slug: 'hero',
      title: 'Hero',
      hold: 1,
      exit: 2,
    },
    {
      slug: 'section-1',
      title: 'Section 1',

      // note: currently overlap must be negative and the sum of (overlap + enter) must be positive
      overlap: -1,
      enter: 1,
      hold: 0.5,
      exit: 2,
    },
    {
      slug: 'section-2',
      title: 'Section 2',
      enter: 0.5,
      exit: 2,
    },
    {
      slug: 'section-3',
      title: 'Section 3',
      enter: 0.5,
      exit: 1.5,
    },
    {
      slug: 'section-4',
      title: 'Section 4',
      enter: 1.5,
      hold: 1,
    },
  ],
})

const webglStore = useWebGLStore()
onMounted(async () => {
  if (webglStore.isInitialized) {
    await $webglManager.loadScene('homepage')
    $webglManager.activateScene('homepage')
  }
})
</script>

<template>
  <main class="page page--index">
    <PageNav :sections="data.sections" />
    <PageSections :sections="data.sections" />
  </main>
</template>

<style lang="scss"></style>
