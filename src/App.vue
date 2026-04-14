<script setup>
import NavBottom from '@/components/nav/NavBottom.vue'
import NavAside from '@/components/nav/NavAside.vue'
import NavTop from './components/nav/NavTop.vue';

import { useBreakpoints } from './composables/useBreakpoints';
import { useRoute } from 'vue-router';

const { width } = useBreakpoints()
const route = useRoute()

</script>

<template>
  <RouterView/>

  <template v-if="route.path !== '/'">
    <NavBottom v-if="width < 768"></NavBottom>
    <NavAside v-if="width >= 768"></NavAside>
    <NavTop v-if="width < 768"></NavTop>
  </template>
</template>

<style lang="scss">



</style>
