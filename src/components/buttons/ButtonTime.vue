<script setup>
defineProps({
    time: String,
    active: Boolean
})



</script>

<template>
    <button class="button-time" :class="{'active': active}" :aria-label="time">
        {{ time }}
    </button>
</template>

<style lang="scss">
   .button-time{
        flex: 1;
        min-width: 150px;
        max-width: 380px;
        height: 40px;
        border-radius: 12px;
        border: 1px solid var(--cinza-claro);
        background-color: var(--fundo);
        color: var(--cinza-nav);

        &.active{
            background-color: var(--rosa-btn-time);
            color: var(--rosa-nav);
            border: 1px solid var(--rosa-nav);
        }
    }
</style>