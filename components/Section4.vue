<script setup>
import { gsap } from 'gsap'
import { useUIStore } from '~/store/ui'

const root = ref(null)
const uiStore = useUIStore()

/**
 * Timeline
 */
let ctx
let tlEnter
let tlExit
function initializeTimelines() {
  gsap.context(() => {
    tlEnter = gsap.timeline({ paused: true }).fromTo(
      root.value,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: 'linear',
      }
    )
  })
}

watchEffect(() => {
  const enterProgress = uiStore.sections['section-4'].enterProgress
  tlEnter?.totalProgress(enterProgress)
})

onMounted(() => {
  initializeTimelines()
})

onUnmounted(() => {
  ctx?.kill()
})
</script>

<template>
  <section class="section-4" ref="root">
    <h2 class="section-4__headline headline headline--1">Section 4</h2>
  </section>
</template>

<style lang="scss">
.section-4 {
  display: flex;
  height: 100vh;

  &__headline {
    margin: auto;
  }
}
</style>
