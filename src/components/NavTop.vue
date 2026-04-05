<script setup>
import Avatar from './Avatar.vue';
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
        box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.12);

        .nav-icon{
            width: 24px;
            height: 24px;
        }
     
    }
</style>