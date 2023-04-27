<script setup>
import { gsap } from 'gsap'
import { useUIStore } from '~/store/ui'

/**
 * Props
 */
const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
})

/**
 * Stores
 */
const uiStore = useUIStore()

// initialize section keys for reactivity
props.sections.forEach((section, i) => {
  uiStore.sections[section.slug] = {
    slug: section.slug,
    progress: 0,
    enterProgress: 0,
    holdProgress: 0,
    scrollProgress: 0,
    exitProgress: 0,
    active: false,
    stage: 'enter',
  }
})

/**
 * DOM Elements
 */
const root = ref(null)
const spacer = ref(null)

/**
 * Timeline
 */
let tl
function onUpdate({ progress }) {
  uiStore.pageProgress = progress
}

function initTimeline() {
  // TODO: use gsap.context to kill all nested timelines

  // revert
  tl?.kill()
  spacer.value.style = null

  // cache heights of sections
  const windowHeight = window.innerHeight
  const sectionEls = [...root.value.querySelectorAll('.page-section')]
  const sectionHeights = props.sections.map((section, index) => {
    const el = sectionEls[index]
    const { height } = el.getBoundingClientRect()
    const scrollableHeight = Math.max(height - windowHeight, 0)
    return {
      overlapPx: (section.overlap || 0) * windowHeight, // overlap with previous seciton
      enterPx: (section.enter || 0) * windowHeight, // duration of entrance transition
      holdPx: (section.hold || 0) * windowHeight, // duration before scroll
      scrollPx: scrollableHeight, // scroll duration
      exitPx: (section.exit || 0) * windowHeight, // duration of exit transition

      overlapVh: section.overlap || 0,
      enterVh: section.enter || 0,
      holdVh: section.hold || 0,
      scrollVh: scrollableHeight / windowHeight,
      exitVh: section.exit || 0,
    }
  })
  const totalHeight = sectionHeights.reduce((accumulator, section) => {
    accumulator += section.overlapPx
    accumulator += section.enterPx
    accumulator += section.holdPx
    accumulator += section.scrollPx
    accumulator += section.exitPx
    return accumulator
  }, 0)

  // set height of spacer
  spacer.value.style.height = `${totalHeight}px`

  // create timeline
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: spacer.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate,
    },
  })

  props.sections.forEach((section, i) => {
    const sectionEl = sectionEls[i]
    const heights = sectionHeights[i]
    const totalDuration =
      heights.enterVh + heights.holdVh + heights.scrollVh + heights.exitVh
    const sectionStatus = uiStore.sections[section.slug]

    tl.addLabel(
      section.slug,
      Math.sign(heights.overlapVh) === -1
        ? `-=${Math.abs(heights.overlapVh)}`
        : `+=${Math.abs(heights.overlapVh)}`
    )

    // progress for each stage
    tl.addLabel(`${section.slug}:enter`, section.slug)
    tl.to(
      sectionStatus,
      {
        enterProgress: 1,
        stage: 'enter',
        duration: heights.enterVh,
        ease: 'linear',
      },
      section.slug
    )
    tl.addLabel(`${section.slug}:hold`)
    tl.to(sectionStatus, {
      holdProgress: 1,
      stage: 'hold',
      duration: heights.holdVh,
      ease: 'linear',
    })
    tl.addLabel(`${section.slug}:scroll`)
    tl.to(sectionStatus, {
      scrollProgress: 1,
      stage: 'scroll',
      duration: heights.scrollVh,
      ease: 'linear',
    })
    tl.to(
      sectionEl,
      {
        duration: heights.scrollVh,
        y: heights.scrollPx * -1,
        ease: 'linear',
      },
      `${section.slug}:scroll`
    )
    tl.addLabel(`${section.slug}:exit`)
    tl.to(sectionStatus, {
      exitProgress: 1,
      stage: 'exit',
      duration: heights.exitVh,
      ease: 'linear',
    })

    // total progress
    tl.to(
      sectionStatus,
      {
        progress: 1,
        active: true,
        duration: totalDuration,
        ease: 'linear',
      },
      section.slug
    )

    if (i !== 0) {
      tl.set(sectionEl, { visibility: 'hidden' }, 0)
    }

    tl.to(
      sectionEl,
      {
        visibility: 'visible',
      },
      section.slug
    )

    if (i < props.sections.length - 1) {
      tl.set(sectionEl, { visibility: 'hidden' })
      tl.set(sectionStatus, { active: false })
    }

    uiStore.sections[section.slug] = sectionStatus
  })
}

function revertTimeline() {
  tl.kill()
}

onMounted(() => {
  initTimeline()
  window.addEventListener('resize', initTimeline)
})
onUnmounted(() => {
  revertTimeline()
  window.removeEventListener('resize', initTimeline)
})
</script>

<template>
  <div class="page-sections" ref="root">
    <PageSection
      v-for="section in sections"
      :key="section.slug"
      :section="section"
    />
  </div>

  <div class="page-sections__spacer" ref="spacer" />
</template>

<style lang="scss">
.page-sections {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
