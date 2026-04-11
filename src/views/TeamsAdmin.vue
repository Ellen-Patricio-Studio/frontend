<script setup>
import EmployeesList from '@/components/teams/EmployeesList.vue';
import AvatarImg from '@/assets/images/logo.jpeg'

</script>

<template>
    <div class="container-teams">
        <h1 class="h1 h1-top">Equipe</h1>
        <input type="text" class="input" placeholder="Buscar...">
        <EmployeesList :src="AvatarImg" alt="Foto de perfil" name="Ellen Patricio" role="Estilista"></EmployeesList>      
        <EmployeesList :src="AvatarImg" alt="Foto de perfil" name="Ellen Patricio" role="Estilista"></EmployeesList>      
        <EmployeesList :src="AvatarImg" alt="Foto de perfil" name="Ellen Patricio" role="Estilista"></EmployeesList>      
        <EmployeesList :src="AvatarImg" alt="Foto de perfil" name="Ellen Patricio" role="Estilista"></EmployeesList>      
        <EmployeesList :src="AvatarImg" alt="Foto de perfil" name="Ellen Patricio" role="Estilista"></EmployeesList>      
        <EmployeesList :src="AvatarImg" alt="Foto de perfil" name="Ellen Patricio" role="Estilista"></EmployeesList>      
    </div>
</template>

<style lang="scss">
    .container-teams{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;

        .input{
            width: 100%;
        }
    
        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;
        }   
    }
</style>