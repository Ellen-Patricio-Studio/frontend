<script setup>
import Avatar from '@/components/Avatar.vue';
import NavLink from './NavLink.vue';
import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'


    
</script>

<template>
    <div class="nav-top">
        <Avatar :src="imgAvatar" alt="Foto de perfil" name="" role=""></Avatar>
        <Icon icon="mingcute:menu-fill" class="nav-icon" />
    </div>
</template>

<style lang="scss">
    .nav-top{
        @include flex(row, space-between, center);
        width: 100vw;
        height: 80px;
        color: var(--cinza-nav);
        padding: 0 24px;
        background-color: var(--cards);
        box-shadow: var(--box-shadow-top);
        position: fixed;
        top: 0;


        .nav-icon{
            width: 24px;
            height: 24px;
        }
     
    }
</style>