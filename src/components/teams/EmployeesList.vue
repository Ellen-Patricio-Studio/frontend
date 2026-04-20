<script setup>
import Avatar from '../Avatar.vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    src: String,
    alt: String,
    name: String,
    role: String,
    hour: String,
    id: Number
})

const linkRedirect = `equipe/${props.id}`

</script>

<template>
    <li class="employee-list-item box">
        <Avatar :src="src" :alt="alt" :name="name" :role="role"></Avatar>
        <div class="right">
            <Icon icon="qlementine-icons:menu-dots-16"/>
            <RouterLink :to="linkRedirect" class="button-select">Perfil</RouterLink>
        </div>
    </li>
</template>

<style lang="scss">

</style>