<script setup>
import EmployeesList from '@/components/teams/EmployeesList.vue';
import AvatarImg from '@/assets/images/logo.jpeg'
import ServiceListItem from '@/components/ServiceListItem.vue';

</script>

<template>
    <div class="container-services">
        <h1 class="h1 h1-top">Serviços</h1>
        <input type="text" class="input" placeholder="Buscar...">
        <ul class="wrapper-boxes box">
            <ServiceListItem></ServiceListItem>
            <ServiceListItem></ServiceListItem>
            <ServiceListItem></ServiceListItem>
        </ul>
    </div>
</template>

<style lang="scss">
    .container-services{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;

        .input{
            width: 100%;
        }

        .wrapper-boxes{
            width: 100%;
            padding: 32px;
            @include flex(row, start, start);
            gap: 16px;
            flex-wrap: wrap;
        }
    
        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;
        }   
    }
</style>