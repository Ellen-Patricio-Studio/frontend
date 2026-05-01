<script setup>

defineProps({
    toggleModal: Function
})

</script>

<template>
    <div class="fundo-modais" @click="toggleModal"></div>
</template>

<style lang="scss">
    .fundo-modais{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.50);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 12;
    }
    
</style>