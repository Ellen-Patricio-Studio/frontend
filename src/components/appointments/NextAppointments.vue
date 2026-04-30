<script setup>
import Avatar from '../Avatar.vue';

defineProps({
    src: String,
    alt: String,
    name: String,
    role: String,
    hour: String,
    status: String
})

    
</script>

<template>
    <li class="item">
        <Avatar :src="src" :alt="alt" :name="name" :role="role" :hour="hour"></Avatar>
        <p class="status">{{ status }}</p>
    </li>
</template>

<style lang="scss">
    .appointments-list, .calendario-list{
        .item{
            width: 100%;
            @include flex(row, space-between, start);
        
            .status{
                font-size: 12px;
                color: var(--verde-ag); /* alterar depois */
            }
        }
    }
</style>