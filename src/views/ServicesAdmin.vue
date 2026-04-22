<script setup>
import EmployeesList from '@/components/teams/EmployeesList.vue';
import AvatarImg from '@/assets/images/logo.jpeg'
import ServiceListItem from '@/components/ServiceListItem.vue';
import { Icon } from '@iconify/vue';
import FundoModais from '@/components/FundoModais.vue';
import { ref } from 'vue';
import NewService from '@/components/modals/NewService.vue';
import NewCategory from '@/components/modals/NewCategory.vue';
import { useServiceStore } from '@/stores/useServiceStore';
import { onMounted, computed } from 'vue';
import DeleteCategory from '@/components/modals/DeleteCategory.vue';


const serviceStore = useServiceStore()
const searchQuery = ref('')

const isModalOpen = ref({
    newCategory: false,
    newService: false,
    deleteCategory: false,
});

const toggleModal = (modal) => {
    isModalOpen.value[modal] = !isModalOpen.value[modal];
}

onMounted(async () => {
    await serviceStore.carregarCategorias()
    await serviceStore.carregarServicos(1)
})

const servicosFiltrados = computed(() => {
    if (!searchQuery.value) {
        return serviceStore.servicos;
    }
    const termo = searchQuery.value.toLowerCase();
    return serviceStore.servicos.filter(servico => 
        servico.nome_servico.toLowerCase().includes(termo)
    );
});

</script>

<template>
    <Teleport to="body" v-if="isModalOpen.newCategory">
        <FundoModais :toggle-modal="() => toggleModal('newCategory')"></FundoModais>
        <NewCategory :toggle-modal="toggleModal"></NewCategory>
    </Teleport>
    <Teleport to="body" v-if="isModalOpen.newService">
        <FundoModais :toggle-modal="() => toggleModal('newService')"></FundoModais>
        <NewService :toggle-modal="toggleModal"></NewService>
    </Teleport>
    <!-- <Teleport to="body" v-if="isModalOpen.deleteCategory">
        <FundoModais :toggle-modal="() => toggleModal('deleteCategory')"></FundoModais>
        <DeleteCategory :toggle-modal="toggleModal"></DeleteCategory>
    </Teleport> Sem implementação no servidor --> 


    <div class="container-services">

        
        <h1 class="h1 h1-top">Serviços
            <div>
                <button class="button-select" @click="toggleModal('newCategory')">Nova categoria</button>
                <button class="button-select" @click="toggleModal('newService')">Novo serviço</button>
            </div>
        </h1>
        <div class="categories-wrapper wrapper-boxes box">
            <h2 class="h2">Categorias</h2>
            <ul class="categories">
                <li class="button-select categories-li" v-for="categoria in serviceStore.categorias" :key="categoria.id">
                    {{categoria.nome_categoria}}
                    <!-- <Icon class="icon" icon="mingcute:close-fill" @click="() => toggleModal('deleteCategory')" /> 
                        Sem implementação no servidor    
                    -->
                </li>
            </ul>
        </div>
        <ul class="wrapper-boxes box">
            <input v-model="searchQuery" type="text" class="input" placeholder="Buscar...">
            <ServiceListItem
                v-for="servico in servicosFiltrados" :key="servico.id"
                :id="servico.id"
                :id_categoria="servico.id_categoria"
                :name="servico.nome_servico"
                :time="servico.duracao_minutos"
                :value="servico.valor"
                :active="servico.ativo"
                ></ServiceListItem>     
            <p v-if="servicosFiltrados.length === 0" class="alert">Nenhum serviço encontrado.</p>       
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

        h1{
            @include flex(row, space-between, center);
            padding-right: 24px;

            div{
                @include flex(row, start, center);
                gap: 16px;
                
                .button-select{
                    cursor: pointer;
                }
            }

        }

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