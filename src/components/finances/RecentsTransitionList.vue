<script setup>
defineProps({
    description: String,
    data: String,
    category: String,
    operation: String,
    value: String,
})
    
</script>

<template>
    <li class="item">
        <p>{{ description }}</p>
        <p>{{ data }}</p>
        <p>{{ category }}</p>
        <p>{{ operation }}</p>
        <p>R${{ value }},00</p>
        <button>...</button>
    </li>
</template>

<style lang="scss">

</style>