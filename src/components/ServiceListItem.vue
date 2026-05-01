<script setup>
import { Icon } from '@iconify/vue';
import EditService from './modals/EditService.vue';
import { ref } from 'vue';
import FundoModais from './FundoModais.vue';
import { useCategorias } from '@/composables/useCategory';
import { computed } from 'vue';

const { categorias, isLoading } = useCategorias()
const isModalOpen = ref(false)

const props = defineProps({
    id: Number,
    id_categoria: Number,
    name: String,
    time: [Number, String],
    value: [Number, String],
    active: Boolean

})


const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
};

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
}

const nomeCategoria = computed(() => {
    const categoriaEncontrada = categorias.value.find(categoria => categoria.id === props.id_categoria);
    return categoriaEncontrada ? categoriaEncontrada.nome_categoria : 'Carregando...';
});


</script>

<template>
    <Teleport to="body" v-if="isModalOpen">
        <FundoModais :toggle-modal="toggleModal"></FundoModais>
        <EditService
            :id_categoria="id_categoria"
            :id="id"
            :name="name"
            :time="time"
            :value="value"
            :active="active"
            :toggle-modal="toggleModal"
        ></EditService>
    </Teleport>
    <li class="servicesListItem box">
        <div class="top">
            <p class="title">{{name}}</p>
            <div class="icons">
                <Icon class="icon icon-edit" icon="tabler:edit-filled" @click="toggleModal()" aria-label="Editar serviço"/>
                <!-- <Icon class="icon icon-remove" icon="ic:outline-delete"/> -->
            </div>
        </div>
        <hr>
        <p class="subtitle">Categoria</p>
        <p class="descricao">{{nomeCategoria}}</p>
        <p class="subtitle">Duração</p>
        <p class="descricao">{{time}}</p>
        <p class="subtitle">Valor</p>
        <p class="descricao">{{formatarMoeda(value)}}</p>
        <!-- <p class="active">{{ active ? "Ativo" : "Desativado"}}</p> -->
    </li>
</template>

<style lang="scss">
    .servicesListItem{
        min-width: 250px;
        // max-width: 250px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.137);
        box-shadow: none;
        @include flex(column, start, start);
        gap: 8px;
        font-size: 12px;
        flex: 1;

        .top{
            width: 100%;
            @include flex(row, space-between, center);
            font-size: 14px;

            .title{
                font-weight: bold;
                color: var(--cinza-nav);
            }

            .icons{
                @include flex(row, space-between, center);
                gap: 8px;
                cursor: pointer;
                font-size: 16px;
            
                .icon-edit{
                    color: var(--azul-escuro-box);
                }

                .icon-remove{
                    color: var(--rosa)
                }
            }
        }


        hr{
            width: 100%;
            border: 1px solid #e2e2e2;
        }

        .subtitle{
            color: var(--cinza-nav);
        }

        .active{
            color: red;

            &.active{
                color: green;
            }
        }
    }
</style>