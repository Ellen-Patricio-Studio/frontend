<script setup>

defineProps({
    src: String,
    alt: String,
    name: String,
    service: String,
    worker: String,
    date: String,
    value: String,
    status: String,
})

    
</script>

<template>
    <li class="item">
        <p class="avatar-area">
            <img :src="src" :alt="alt" class="avatar-img">
            <span class="name">{{ name }}</span>
        </p>
        <p class="service">{{ service }}</p>
        <p class="worker">{{ worker }}</p>
        <p class="date">{{ date }}</p>
        <p class="value">{{ value }}</p>
        <p class="status">{{ status }}</p>
        <button>...</button>
    </li>
</template>

<style lang="scss">

</style>