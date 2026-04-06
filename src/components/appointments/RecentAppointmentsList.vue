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
    .recent-appointments{
        .item{
            width: 100%;
            @include flex(row, space-between, center);
            font-size: 12px;
            flex: 1;
            gap: 12px;

            p, button{
                flex: 1;
                text-align: center;
                background: none;
                border: none;
            }

            .avatar-img{
                width: 20px;
                height: 20px;
            }

            .avatar-area{
                @include flex(row, center, center);
                gap: 8px;
                flex: 1;
                text-align: center;
            }
        }
    }
</style>