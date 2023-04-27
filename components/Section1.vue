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
let typeInstance2
function splitLines() {
  typeInstance = new SplitType(
    root.value.querySelector('.section-1__headline'),
    { types: 'lines' }
  )
  typeInstance2 = new SplitType(root.value.querySelector('.section-1__copy'), {
    types: 'lines',
  })
}

/**
 * Timeline
 */
let ctx
let tl1
let tl2
function initializeTimelines() {
  gsap.context(() => {
    tl1 = gsap
      .timeline({ paused: true, lazy: false })
      .fromTo(
        typeInstance.lines,
        {
          opacity: 0,
          y: '5vh',
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power2.out',
        }
      )
      .fromTo(
        typeInstance2.lines,
        {
          opacity: 0,
          y: '5vh',
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power2.out',
        }
      )

    tl2 = gsap
      .timeline({ paused: true })
      .to(root.value.querySelector('.section-1__content'), {
        opacity: 0,
        ease: 'power2.out',
      })
  })
}

watchEffect(() => {
  const enterProgress = uiStore.sections['section-1'].enterProgress
  tl1?.totalProgress(enterProgress)

  const exitProgress = uiStore.sections['section-1'].exitProgress
  tl2?.totalProgress(exitProgress)
})

onMounted(() => {
  splitLines()
  initializeTimelines()
})

onUnmounted(() => {
  ctx?.kill()
})
</script>

<template>
  <section class="section-1" ref="root">
    <div class="section-1__content">
      <h2 class="section-1__headline headline headline--2">
        Here's a first section of content
      </h2>
      <p class="section-1__copy text-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacus
        felis, faucibus non nisi a, placerat condimentum tellus. Suspendisse in
        ligula a felis vestibulum rhoncus eget sit amet urna.
      </p>
    </div>
  </section>
</template>

<style lang="scss">
.section-1 {
  color: #fff;
  display: flex;
  align-items: center;

  &__content {
    margin-top: 10vh;
    margin-left: 30px;
    width: 25vw;
  }
}
</style>
