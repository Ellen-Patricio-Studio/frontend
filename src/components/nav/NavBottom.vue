<script setup>
import NavLink from './NavLink.vue';

    
</script>

<template>
    <ul id="nav">
        <NavLink icon="material-symbols:dashboard-rounded" texto="Dashboard" redirect="dashboard"></NavLink>
        <NavLink icon="solar:calendar-bold" texto="Agendamentos" redirect="agendamentos"></NavLink>
        <NavLink icon="boxicons:dollar" texto="Financeiro" redirect="financas"></NavLink>
        <NavLink icon="fa7-solid:gears" texto="Serviços" redirect="login"></NavLink>
        <NavLink icon="fluent:people-team-24-filled" texto="Equipe" redirect="equipe"></NavLink>
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
