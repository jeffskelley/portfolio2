<script setup>
import { GlobalEmitter } from '~/utils/GlobalEmitter'

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update', 'activate', 'deactivate'])
const root = ref(null)

const bbox = reactive({
  top: 0,
  left: 0,
  width: 0,
  height: 0,
})

/**
 * Observer
 */
let observer
const active = ref(false)
function initializeObserver() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        // enter
        active.value = true
        emit('activate')
        GlobalEmitter.emit('pe:activate', props.slug)
        GlobalEmitter.emit(`pe:activate:${props.slug}`)
        requestAnimationFrame(update)
      } else {
        // exit
        emit('deactivate')
        GlobalEmitter.emit('pe:deactivate', props.slug)
        GlobalEmitter.emit(`pe:deactivate:${props.slug}`)
        active.value = false
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
  if (active.value) {
    requestAnimationFrame(update)
    const { top, left, width, height } = root.value.getBoundingClientRect()
    bbox.top = top
    bbox.left = left
    bbox.width = width
    bbox.height = height
  }
}

watchEffect(() => {
  if (root.value) {
    initializeObserver()
  }
})

onBeforeUnmount(() => {
  killObserver()
})

/**
 * Emitters
 */
watchEffect(() => {
  emit('update', {
    top: bbox.top,
    left: bbox.left,
    width: bbox.width,
    height: bbox.height,
  })
  GlobalEmitter.emit(`pe:update:${props.slug}`, {
    top: bbox.top,
    left: bbox.left,
    width: bbox.width,
    height: bbox.height,
  })
})
</script>

<template>
  <div class="position-emitter" ref="root">
    <slot />
    <div class="position-emitter__debug">
      <ul>
        <li>Top: {{ bbox.top }}</li>
        <li>Left: {{ bbox.left }}</li>
        <li>Width: {{ bbox.width }}</li>
        <li>Height: {{ bbox.height }}</li>
        <li>Active: {{ active }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.position-emitter {
  position: relative;

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
