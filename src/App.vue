<script setup>
import NavBottom from '@/components/nav/NavBottom.vue'
import NavAside from '@/components/nav/NavAside.vue'
import NavTop from './components/nav/NavTop.vue';

import { useBreakpoints } from './composables/useBreakpoints';
import { useRoute } from 'vue-router';
import FundoMenu from './components/FundoMenu.vue';
import { useMenuStore } from './stores/useMenuStore';

const { width } = useBreakpoints()
const menuStore = useMenuStore()
const route = useRoute()



</script>

<template>
  <RouterView/>

  <template v-if="route.path !== '/'">
    <NavBottom v-if="width < 768"></NavBottom>
    <NavAside></NavAside>
    <NavTop v-if="width < 768"></NavTop>
    <FundoMenu v-if="menuStore.isMenuOpen && width < 768"></FundoMenu>
  </template>
</template>

<style lang="scss">



</style>
