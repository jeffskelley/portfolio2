<script setup>
import { useUIStore } from '~/store/ui'
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
})

const uiStore = useUIStore()
const status = computed(() => uiStore.sections[props.section.slug])
</script>

<template>
  <section class="page-section" :class="[`page-section--${section.slug}`]">
    <SectionHero v-if="section.slug === 'hero'" />
    <Section1 v-else-if="section.slug === 'section-1'" />
    <Section2 v-else-if="section.slug === 'section-2'" />
    <Section3 v-else-if="section.slug === 'section-3'" />
    <Section4 v-else-if="section.slug === 'section-4'" />
  </section>
</template>

<style lang="scss">
.page-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  visibility: hidden;

  &:first-child {
    visibility: visible;
  }
}
</style>
