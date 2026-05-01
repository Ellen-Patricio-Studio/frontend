<script setup>
import EmployeesList from '@/components/teams/EmployeesList.vue';
import AvatarImg from '@/assets/images/logo.jpeg'
import NewEmployee from '@/components/modals/NewEmployee.vue';
import FundoModais from '@/components/FundoModais.vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useEquipeStore } from '@/stores/useEquipeStore';

const isModalOpen = ref(false);

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
}

const equipeStore = useEquipeStore()

onMounted(() => {
    equipeStore.carregarEquipe()
})



</script>

<template>
    <Teleport to="body" v-if="isModalOpen">
        <FundoModais :toggle-modal="toggleModal"></FundoModais>
        <NewEmployee :toggle-modal="toggleModal"></NewEmployee>
    </Teleport>
    <div class="container-teams">
        <h1 class="h1 h1-top">Equipe <button class="button-select" @click="toggleModal" aria-label="Novo funcionário">Novo funcionário</button></h1>
        <input type="text" class="input" placeholder="Buscar...">
        <EmployeesList v-for="funcionario in equipeStore.funcionarios" :key="funcionario.id" :src="AvatarImg" alt="Foto de perfil" :name="funcionario.nome_completo" :role="funcionario.cargo" :id="funcionario.id"></EmployeesList>          
    </div>
</template>

<style lang="scss">
    .container-teams{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;

        h1{
            
            .button-select{
                cursor: pointer;
            }
        }

        .input{
            width: 100%;
        }
    
        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;
        }   
    }
</style>