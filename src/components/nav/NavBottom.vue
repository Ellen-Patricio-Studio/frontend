<script setup>
import NavLink from './NavLink.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';    
import { useRoute } from 'vue-router';

const route = useRoute()
const auth = useAuthStore()

onMounted(async () => {
    if(auth.token && !auth.user){
        await auth.carregarPerfil()
    }
})

</script>

<template>
    <ul id="nav">
        <NavLink  icon="material-symbols:dashboard-rounded" texto="Dashboard" :active="route.name === 'dashboard'" redirect="dashboard"></NavLink>
        <NavLink  icon="solar:calendar-bold" texto="Agendamentos" :active="route.name === 'agendamentos'" redirect="agendamentos"></NavLink>
        <NavLink v-if="auth.isAdmin" icon="boxicons:dollar" texto="Financeiro" :active="route.name === 'financas'" redirect="financas"></NavLink>
        <NavLink v-if="auth.isAdmin" icon="fa7-solid:gears" texto="Serviços" :active="route.name === 'servicos'" redirect="servicos"></NavLink>
        <NavLink v-if="auth.isAdmin" icon="fluent:people-team-24-filled" texto="Equipe" :active="route.name === 'equipe'" redirect="equipe"></NavLink>
        <NavLink v-if="auth.isAdmin" icon="f7:person-2-fill" texto="Clientes" :active="route.name === 'clientes'" redirect="clientes"></NavLink>
        <NavLink  icon="mdi:account" texto="Conta" :active="route.name === 'conta'" redirect="conta"></NavLink>
    </ul>
</template>

<style lang="scss">
    #nav{
        @include flex(row, space-between, center);
        width: 100vw;
        height: 80px;
        background-color: var(--cards);
        position: fixed;
        bottom: 0;
        box-shadow: var(--box-shadow-bottom);
        z-index: 10;

        a{
            font-size: 9px;
            flex: 1;
        }

        .nav-link{
            &.is-active{
                border-radius: 0;
                outline: none;
            }
        }
    }
</style>
