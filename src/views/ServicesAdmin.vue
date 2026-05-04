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
import EditCategory from '@/components/modals/EditCategory.vue';


const serviceStore = useServiceStore()
const searchQuery = ref('')
const nomeCategoriaSelecionada = ref(null)
const idCategoriaSelecionada = ref(null)
const ativoCategoriaSelecionada = ref(null)

const isModalOpen = ref({
    newCategory: false,
    newService: false,
    editCategory: false,
});

const toggleModal = (modal) => {
    isModalOpen.value[modal] = !isModalOpen.value[modal];
}

const saveCategoria = (nome, id, ativo) => {
    idCategoriaSelecionada.value = id
    nomeCategoriaSelecionada.value = nome
    ativoCategoriaSelecionada.value = ativo
} 

onMounted(async () => {
    await serviceStore.carregarCategorias()
    await serviceStore.carregarServicos(1)
})

const servicosFiltrados = computed(() => {
    const base = serviceStore.servicosOrdenados  // ← getter ordenado
    if (!searchQuery.value) return base
    const termo = searchQuery.value.toLowerCase()
    return base.filter(s => s.nome_servico.toLowerCase().includes(termo))
})

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
    <Teleport to="body" v-if="isModalOpen.editCategory">
        <FundoModais :toggle-modal="() => toggleModal('editCategory')"></FundoModais>
        <EditCategory :toggle-modal="toggleModal" :id="idCategoriaSelecionada" :nome="nomeCategoriaSelecionada" :ativo="ativoCategoriaSelecionada"></EditCategory>
    </Teleport>

    <div class="container-services">
        <h1 class="h1 h1-top">Serviços
            <div>
                <button class="button-select" @click="toggleModal('newCategory')" aria-label="Nova categoria">Nova categoria</button>
                <button class="button-select" @click="toggleModal('newService')" aria-label="Novo serviço">Novo serviço</button>
            </div>
        </h1>

        <!-- Categorias -->
        <div class="wrapper-boxes box">
            <h2 class="h2">Categorias</h2>
            <ul class="categories-grid">
                <li
                    class="cat-card"
                    v-for="categoria in serviceStore.categoriasOrdenadas"
                    :key="categoria.id"
                >
                    <span class="cat-name" :title="categoria.nome_categoria">
                        {{ categoria.nome_categoria }}
                    </span>
                    <div class="cat-footer">
                        <span :class="['status-badge', categoria.ativo ? 'active' : 'no-active']">
                            {{ categoria.ativo ? 'Ativo' : 'Desativado' }}
                        </span>
                        <Icon
                            class="icon icon-edit"
                            icon="tabler:edit-filled"
                            @click="() => {
                                saveCategoria(categoria.nome_categoria, categoria.id, categoria.ativo)
                                toggleModal('editCategory')
                            }"
                            aria-label="Editar categoria"
                        />
                    </div>
                </li>
            </ul>
        </div>

        <!-- Serviços -->
        <div class="wrapper-boxes box">
            <input v-model="searchQuery" type="text" class="input" placeholder="Buscar...">
            <ul class="services-grid">
                <ServiceListItem
                    v-for="servico in servicosFiltrados"
                    :key="servico.id"
                    :id="servico.id"
                    :id_categoria="servico.id_categoria"
                    :name="servico.nome_servico"
                    :time="servico.duracao_minutos"
                    :value="servico.valor"
                    :active="servico.ativo"
                />
            </ul>
            <p v-if="servicosFiltrados.length === 0" class="alert">Nenhum serviço encontrado.</p>
        </div>
    </div>
</template>

<style lang="scss">
.container-services {
    padding: 16px 24px;
    @include flex(column, center, start);
    gap: 32px;
    margin: calc(80px + 16px) 0;
    transition: 1s;

    h1 {
        div {
            @include flex(row, start, center);
            gap: 16px;
        }
    }

    .input { width: 100%; }

    .wrapper-boxes {
        width: 100%;
        padding: 24px;
        @include flex(column, start, start);
        gap: 16px;
    }

    // ── Categorias ─────────────────────────────────────────────────────────────
    .categories-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 10px;
        width: 100%;
        list-style: none;
        padding: 0;
    }

    .cat-card {
        background: var(--cards);
        border: 0.5px solid var(--cinza-service);
        border-radius: 10px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0; // evita overflow no grid
        cursor: default;
    }

    .cat-name {
        font-size: 12px;
        color: var(--cinza-nav);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        // Limite de largura garante que o ellipsis sempre atue
        max-width: 100%;
    }

    .cat-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .status-badge {
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 999px;
        white-space: nowrap;

        &.active {
            background-color: var(--verde-claro-ag, #d1fae5);
            color: var(--verde-escuro-box, #065f46);
        }

        &.no-active {
            background-color: var(--vermelho-claro-ag, #fee2e2);
            color: var(--vermelho-ag, #991b1b);
        }
    }

    .icon-edit {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
        cursor: pointer;
        color: var(--azul-escuro-box);
    }

    // ── Serviços ───────────────────────────────────────────────────────────────
    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        width: 100%;
        list-style: none;
        padding: 0;
    }

    @media all and (min-width: 768px) {
        padding-left: calc(256px + 32px);
        margin-bottom: 16px;
    }
}
</style>