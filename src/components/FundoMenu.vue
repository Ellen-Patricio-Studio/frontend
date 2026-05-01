<script setup>

import { useMenuStore } from '@/stores/useMenuStore';
const menuStore = useMenuStore()


</script>

<template>
    <div class="fundo-menu" @click="menuStore.toggleMenu()"></div>
</template>

<style lang="scss">
    .fundo-menu{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.50);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
    }
    
</style>