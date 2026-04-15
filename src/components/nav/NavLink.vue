<script setup>
import { Icon } from '@iconify/vue';
defineProps({
    icon: String,
    texto: String,
    active: Boolean,
    redirect: String
})
    
</script>

<template>
    <RouterLink :to="{name: redirect}" class="nav-link" :class="{'is-active': active}">
        <Icon :icon="icon" class="nav-icon" />
        <p>{{texto}}</p>
    </RouterLink>
</template>

<style lang="scss">
    .nav-link{
        @include flex(column, center, center);
        flex-grow: 1;
        height: 100%;
        background-color: var(--cards);
        gap: 8px;
        color: var(--cinza-nav);

        .nav-icon{
            width: 16px;
            height: 16px;
        }

        &:hover{
            background-color: var(--fundo);
        }

        &.is-active{
            background-color: var(--cinza-ativo-nav);
            color: var(--rosa-nav);
            border-radius: 12px;
            outline: 1px solid rgba(0,0,0,0.15);
            outline-offset: 0px;
        }
        
    }
</style>