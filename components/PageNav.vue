<script setup>
import { useUIStore } from '~/store/ui'

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
})

const uiStore = useUIStore()
</script>

<template>
  <nav class="page-nav">
    <div class="page-nav__content">
      <button v-for="section in sections" class="page-nav__button">
        {{ section.title }}
      </button>
    </div>
    <ProgressBar class="page-nav__progress" :progress="uiStore.pageProgress" />
  </nav>
</template>

<style lang="scss">
.page-nav {
  position: fixed;
  z-index: 20;
  top: 30px;
  left: 30px;
  right: 30px;
  height: 45px;

  &__content {
    position: relative;
    z-index: 20;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__button {
    margin: 0 15px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: bold;
  }

  &__progress {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
