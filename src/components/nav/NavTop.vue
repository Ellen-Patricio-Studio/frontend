<script setup>
import Avatar from '@/components/Avatar.vue';
import NavLink from './NavLink.vue';
import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useMenuStore } from '@/stores/useMenuStore';
const menuStore = useMenuStore()
import { useThemeStore } from '@/stores/useThemeStore';
const themeStore = useThemeStore()
    
</script>

<template>
    <div class="nav-top">
        <RouterLink :to="{name: 'dashboard'}" class="logo-area">
            <img src="@/assets/images/logo.jpeg" alt="">
            <span>Ellen Patricio Studio </span>
        </RouterLink>
        <div class="icons">
            <Icon icon="ri:toggle-line" @click="themeStore.toggleTheme" class="nav-icon"/>
            <Icon icon="mingcute:menu-fill" class="nav-icon" @click="menuStore.toggleMenu()" aria-label="Abrir menu"/>
        </div>
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
        z-index: 10;

        .icons{
            @include flex (row, start,center);
            gap: 8px;

            .nav-icon{
                width: 24px;
                height: 24px;
                cursor: pointer;
            }
        }

     
    }
</style>