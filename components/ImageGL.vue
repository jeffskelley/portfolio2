<script setup>
// DEPRECATED
// migrated to PositionEmitter

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
})

const root = ref(null)

const naturalDimensions = reactive({
  width: 0,
  height: 0,
})

const bbox = reactive({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
})

/**
 * Listeners
 */

// TODO: on load, recalculate heights for sections

let observer
let active
function initializeObserver() {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        // enter
        active = true
        requestAnimationFrame(update)
      } else {
        // exit
        active = false
      }
    },
    {
      rootMargin: '0% 0% 0% 0%',
    }
  )
  observer.observe(root.value)
}

function killObserver() {
  observer?.disconnect()
}

function update() {
  if (active) {
    requestAnimationFrame(update)
    const { top, left, width, height } = root.value.getBoundingClientRect()
    bbox.top = top
    bbox.left = left
    bbox.width = width
    bbox.height = height
  }
}

onMounted(() => {
  initializeObserver()
})

onBeforeUnmount(() => {
  killObserver()
})
</script>

<template>
  <div class="image-gl" ref="root">
    <img :src="src" />
    <div class="image-gl__debug">
      <ul>
        <li>Top: {{ bbox.top }}</li>
        <li>Left: {{ bbox.left }}</li>
        <li>Width: {{ bbox.width }}</li>
        <li>Height: {{ bbox.height }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.image-gl {
  position: relative;

  img {
    // visibility: hidden;
  }

  &__debug {
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    color: #fff;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.01em;
  }
}
</style>
