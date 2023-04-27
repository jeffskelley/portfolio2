<script setup>
import { useUIStore } from '~/store/ui'
import { useMouse } from '~/composables/mouse'

const uiStore = useUIStore()
const mouse = useMouse()
const sections = computed(() => Object.values(uiStore.sections))

function toPercent(value) {
  return (value * 100).toFixed(2) + '%'
}
</script>

<template>
  <div class="debug">
    <ul>
      <li>Page progress: {{ toPercent(uiStore.pageProgress) }}</li>
      <template v-for="section in sections">
        <li>---</li>
        <li>{{ section.slug }}</li>
        <li>Stage: {{ section.stage }}</li>
        <li>Progress: {{ toPercent(section.progress) }}</li>
        <li>Enter: {{ toPercent(section.enterProgress) }}</li>
        <li>Hold: {{ toPercent(section.holdProgress) }}</li>
        <li>Scroll: {{ toPercent(section.scrollProgress) }}</li>
        <li>Exit: {{ toPercent(section.exitProgress) }}</li>
        <li>Active: {{ section.active }}</li>
      </template>
    </ul>
  </div>
</template>

<style lang="scss">
.debug {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: #000;
  color: #fff;
  padding: 5px;
  font-size: 12px;
  font-family: sans-serif;
  text-transform: uppercase;
}
</style>
