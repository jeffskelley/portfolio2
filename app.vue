<script setup>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger)
</script>

<template>
  <div class="app">
    <ClientOnly>
      <Debug />
    </ClientOnly>

    <NuxtPage />

    <GlobalWebGLContainer />
  </div>
</template>

<style lang="scss"></style>
