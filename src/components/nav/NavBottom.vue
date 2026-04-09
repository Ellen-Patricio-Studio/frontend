<script setup>
import NavLink from './NavLink.vue';

    
</script>

<template>
    <ul id="nav">
        <NavLink icon="material-symbols:dashboard-rounded" texto="Dashboard"></NavLink>
        <NavLink icon="solar:calendar-bold" texto="Agendamentos"></NavLink>
        <NavLink icon="boxicons:dollar" texto="Financeiro"></NavLink>
        <NavLink icon="fa7-solid:gears" texto="Serviços"></NavLink>
        <NavLink icon="fluent:people-team-24-filled" texto="Equipe"></NavLink>
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
        box-shadow: 0px -2px 4px 0px rgba(0,0,0,0.06);
        z-index: 10;

        li{
            font-size: 10px;
        }
    }
</style>
