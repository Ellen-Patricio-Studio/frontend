<script setup>
import NavLink from './NavLink.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';    

const auth = useAuthStore()

onMounted(async () => {
    if(auth.token && !auth.user){
        await auth.carregarPerfil()
    }
})

</script>

<template>
    <ul id="nav">
        <NavLink  icon="material-symbols:dashboard-rounded" texto="Dashboard" active="true" redirect="dashboard"></NavLink>
        <NavLink  icon="solar:calendar-bold" texto="Agendamentos" redirect="agendamentos"></NavLink>
        <NavLink v-if="auth.isAdmin" icon="boxicons:dollar" texto="Financeiro" redirect="financas"></NavLink>
        <NavLink v-if="auth.isAdmin" icon="fa7-solid:gears" texto="Serviços" redirect="servicos"></NavLink>
        <NavLink v-if="auth.isPeloMenosFuncionario" icon="fluent:people-team-24-filled" texto="Equipe" redirect="equipe"></NavLink>
        <NavLink  icon="mdi:account" texto="Conta" redirect="conta"></NavLink>
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
            font-size: 10px;
        }
    }
</style>
