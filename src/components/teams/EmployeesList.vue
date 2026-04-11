<script setup>
import Avatar from '../Avatar.vue';
import { Icon } from '@iconify/vue';

defineProps({
    src: String,
    alt: String,
    name: String,
    role: String,
    hour: String,
})

</script>

<template>
    <li class="employee-list-item box">
        <Avatar :src="src" :alt="alt" :name="name" :role="role"></Avatar>
        <div class="right">
            <Icon icon="qlementine-icons:menu-dots-16"/>
            <button class="button-select">Perfil</button>
        </div>
    </li>
</template>

<style lang="scss">

</style>