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
      root.value.querySelector('.section-2__content'),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: 'linear',
      }
    )

    tlExit = gsap
      .timeline({ paused: true })
      .to(root.value.querySelector('.section-2__content'), {
        opacity: 0,
        ease: 'linear',
      })
  })
}

watchEffect(() => {
  const enterProgress = uiStore.sections['section-2'].enterProgress
  tlEnter?.totalProgress(enterProgress)

  const exitProgress = uiStore.sections['section-2'].exitProgress
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
  <section class="section-2" ref="root">
    <div class="section-2__content">
      <h1 class="section-2__headline headline headline--1">
        Section 2 has a long natural scroll
      </h1>

      <div class="section-2__copy text-body">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          venenatis lacus a tortor convallis rutrum vitae sit amet magna.
        </p>

        <p>
          In a sodales orci. Nullam at tortor est. Class aptent taciti sociosqu
          ad litora torquent per conubia nostra, per inceptos himenaeos.
        </p>

        <PositionEmitter slug="dogImage" class="section-2__image">
          <img src="/assets/img/fpo/dog-1.jpg" />
        </PositionEmitter>

        <p>
          Nam ante ex, cursus id laoreet eu, porta vel libero. Cras vitae tempor
          enim.
        </p>

        <p>
          Aliquam tincidunt gravida urna, at sollicitudin nisi tincidunt sit
          amet. Integer eu mollis nisi.
        </p>

        <p>
          Proin sodales, ipsum at euismod dictum, metus ligula suscipit neque,
          quis convallis nisi magna eu sapien.
        </p>

        <p>
          Donec consectetur nunc eget metus porttitor, nec blandit enim
          ullamcorper. In interdum mollis urna non malesuada.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.section-2 {
  &__content {
    width: 50vw;
    margin: 35vh auto 100vh;
  }

  &__copy {
    display: flex;
    flex-direction: column;
    width: 50vw;

    > * {
      margin-top: 20vh;
      width: 20vw;
    }

    > *:nth-child(2n-1) {
      margin-left: auto;
    }
  }

  &__image {
    margin-top: 10vh;
  }
}
</style>
