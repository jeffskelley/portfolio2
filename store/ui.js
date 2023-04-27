import { defineStore } from 'pinia'

export const useUIStore = defineStore('uiStore', () => {
  const menuIsOpen = ref(false)
  const pageProgress = ref(0)
  const sections = reactive({})
  return {
    menuIsOpen,
    pageProgress,
    sections,
  }
})
