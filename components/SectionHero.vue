<script setup>
import { gsap } from 'gsap'
import SplitType from 'split-type'
import { MathUtils } from 'three'
import { useUIStore } from '~/store/ui'

const root = ref(null)
const uiStore = useUIStore()

/**
 * Text split
 */
let typeInstance
function splitLines() {
  typeInstance = new SplitType(
    root.value.querySelector('.section-hero__headline'),
    { types: 'lines' }
  )
}

/**
 * Timeline
 */
const timeline = ref(null)
function initializeTimeline() {
  timeline.value = gsap.timeline({ paused: true }).to(typeInstance.lines, {
    y: '-50%',
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power2.in',
  })
}

watchEffect(() => {
  const timelineProgress = MathUtils.smoothstep(
    uiStore.sections.hero.exitProgress,
    0,
    0.5
  )
  timeline.value?.progress(timelineProgress)
})

onMounted(() => {
  splitLines()
  initializeTimeline()
})

onUnmounted(() => {
  timeline.value?.kill()
})
</script>

<template>
  <div class="section-hero" ref="root">
    <h1 class="section-hero__headline headline headline--1">
      This is the<br />
      Hero Section <br />
      Of the homepage
    </h1>
  </div>
</template>

<style lang="scss">
.section-hero {
  display: flex;
  height: 100vh;

  &__headline {
    margin: auto;
  }
}
</style>
