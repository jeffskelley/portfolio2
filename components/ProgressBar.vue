<script setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <div class="progress-bar">
    <div
      class="progress-bar__inner"
      :style="{ transform: `translateX(${(1 - progress) * -100}%)` }"
    />
  </div>
</template>

<style lang="scss">
.progress-bar {
  background: rgba(#fff, 0.1);
  overflow: hidden;

  &__inner {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(#fff, 1);
  }
}
</style>
