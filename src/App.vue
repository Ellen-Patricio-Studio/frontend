<script setup>
  import NavBottom from '@/components/NavBottom.vue'
  import NavAside from '@/components/NavAside.vue'
  import NavTop from './components/NavTop.vue';
  import { useBreakpoints } from './composables/useBreakpoints';
  const { width } = useBreakpoints()

</script>

<template>
  <NavBottom v-if="width < 768"></NavBottom>
  <NavAside v-if="width >= 768"></NavAside>
  <NavTop v-if="width < 768"></NavTop>
</template>

<style lang="scss">

</style>
