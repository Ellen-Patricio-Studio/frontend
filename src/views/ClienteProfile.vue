<!-- views/ClienteProfile.vue -->
<script setup>
import { Icon } from '@iconify/vue'
import FundoModais from '@/components/FundoModais.vue'
import EditCliente from '@/components/modals/EditCliente.vue'
import DeleteCliente from '@/components/modals/DeleteCliente.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClientesStore } from '@/stores/UseClientesStore'

const route = useRoute()
const router = useRouter()
const clientesStore = useClientesStore()

const id = route.params.id

const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)

const toggleEditModal = () => {
    isEditModalOpen.value = !isEditModalOpen.value
}

const toggleDeleteModal = () => {
    isDeleteModalOpen.value = !isDeleteModalOpen.value
}

onMounted(async () => {
    await clientesStore.buscarPorId(id)
})
</script>

<template>
    <!-- Modal de Edição -->
    <Teleport to="body" v-if="isEditModalOpen">
        <FundoModais :toggle-modal="toggleEditModal"></FundoModais>
        <EditCliente
            :toggle-modal="toggleEditModal"
            :cliente="clientesStore.clienteSelecionado"
        ></EditCliente>
    </Teleport>

    <!-- Modal de Exclusão -->
    <!-- <Teleport to="body" v-if="isDeleteModalOpen">
        <FundoModais :toggle-modal="toggleDeleteModal"></FundoModais>
        <DeleteCliente
            :toggle-modal="toggleDeleteModal"
            :cliente="clientesStore.clienteSelecionado"
        ></DeleteCliente>
    </Teleport> -->

    <p v-if="clientesStore.loading">Carregando perfil...</p>

    <div v-else-if="clientesStore.clienteSelecionado" class="container-profile">
        <!-- Breadcrumb + voltar -->
        <div class="wrapper-name h1-top">
            <div class="names">
                <p>Clientes</p>
                <p>></p>
                <p>{{ clientesStore.clienteSelecionado?.nome_completo }}</p>
            </div>
            <RouterLink :to="{ name: 'clientes' }">
                <Icon icon="icon-park-outline:return" />
            </RouterLink>
        </div>

        <!-- Card principal -->
        <div class="box box-perfil-cliente">
            <div class="perfil-header">
                <div class="avatar-placeholder large">
                    {{ clientesStore.clienteSelecionado?.nome_completo?.charAt(0).toUpperCase() }}
                </div>
                <div class="perfil-info">
                    <h2 class="h2">{{ clientesStore.clienteSelecionado?.nome_completo }}</h2>
                    <span class="role-tag">Cliente</span>
                </div>
                <div class="perfil-actions"  v-if="clientesStore.clienteSelecionado?.nome_completo !== 'Anonimizado'">
                    <button class="button-select" @click="toggleEditModal" aria-label="Editar">
                        <Icon icon="mingcute:edit-line" /> Editar
                    </button>
                    <!-- <button class="button-select button-remove" @click="toggleDeleteModal">
                        <Icon icon="mdi:trash-can-outline" /> Excluir
                    </button> -->
                </div>
            </div>

            <hr>

            <div class="perfil-details">
                <div class="detail-item">
                    <Icon icon="mingcute:mail-line" />
                    <div>
                        <p class="label">Email</p>
                        <p class="value">{{ clientesStore.clienteSelecionado?.email }}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <Icon icon="mingcute:phone-line" />
                    <div>
                        <p class="label">Telefone</p>
                        <p class="value">{{ clientesStore.clienteSelecionado?.telefone || '—' }}</p>
                    </div>
                </div>
                <div class="detail-item">
                    <Icon icon="mingcute:user-3-line" />
                    <div>
                        <p class="label">ID</p>
                        <p class="value">#{{ clientesStore.clienteSelecionado?.id }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <p v-else class="alert">Cliente não encontrado.</p>
</template>

<style lang="scss">
.container-profile {
    padding: 16px 24px;
    @include flex(column, center, start);
    gap: 32px;
    margin: calc(80px + 16px) 0;
    transition: 1s;
    font-size: 14px;
    color: var(--cinza-nav);

    .wrapper-name {
        @include flex(row, space-between, center);
        width: 100%;

        .names {
            @include flex(row, start, center);
            gap: 16px;
        }
    }

    .box-perfil-cliente {
        width: 100%;
        @include flex(column, start, start);
        gap: 24px;

        .perfil-header {
            @include flex(row, space-between, center);
            width: 100%;
            gap: 16px;
            flex-wrap: wrap;

            .avatar-placeholder.large {
                width: 64px;
                height: 64px;
                border-radius: 50%;
                background-color: var(--color-rosa, #e91e8c);
                color: #fff;
                @include flex(row, center, center);
                font-weight: bold;
                font-size: 24px;
                flex-shrink: 0;
            }

            .perfil-info {
                @include flex(column, start, start);
                gap: 4px;
                flex: 1;

                .role-tag {
                    font-size: 12px;
                    opacity: 0.6;
                    background: rgba(0, 0, 0, 0.06);
                    padding: 2px 8px;
                    border-radius: 99px;
                }
            }

            .perfil-actions {
                @include flex(row, end, center);
                gap: 12px;

                .button-select {
                    @include flex(row, center, center);
                    gap: 6px;
                    cursor: pointer;
                }

                .button-remove {
                    color: rgb(160, 30, 30);
                }
            }
        }

        .perfil-details {
            @include flex(column, start, start);
            gap: 20px;
            width: 100%;

            .detail-item {
                @include flex(row, start, center);
                gap: 12px;

                svg {
                    font-size: 20px;
                    opacity: 0.6;
                    flex-shrink: 0;
                }

                .label {
                    font-size: 11px;
                    opacity: 0.5;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .value {
                    font-size: 14px;
                    font-weight: 500;
                }
            }
        }
    }

    @media all and (min-width: 768px) {
        padding-left: calc(256px + 32px);
        margin-bottom: 16px;

        .wrapper-name {
            width: calc(100vw - 256px - 16px);
            padding-right: 32px;
        }
    }
}
</style>