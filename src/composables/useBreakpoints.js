import { ref, onMounted, onUnmounted } from 'vue'

export function useBreakpoints() {
  const width = ref(window.innerWidth)
  
  const update = () => (width.value = window.innerWidth)
  
  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))
  
  return { width }
}