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

    tlExit = gsap.timeline({ paused: true }).to(root.value, {
      opacity: 0,
      ease: 'linear',
    })
  })
}

watchEffect(() => {
  const enterProgress = uiStore.sections['section-3'].enterProgress
  tlEnter?.totalProgress(enterProgress)

  const exitProgress = uiStore.sections['section-3'].exitProgress
  tlExit?.totalProgress(exitProgress)
})

onMounted(() => {
  initializeTimelines()
})

onUnmounted(() => {
  ctx?.kill()
})
</script>

<template>
  <section class="section-3" ref="root">
    <h2 class="section-3__headline headline headline--1">Section 3</h2>
  </section>
</template>

<style lang="scss">
.section-3 {
  display: flex;
  height: 100vh;

  &__headline {
    margin: auto;
  }
}
</style>
