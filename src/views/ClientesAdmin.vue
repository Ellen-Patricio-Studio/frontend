<!-- views/ClientesAdmin.vue -->
<script setup>
import ClientesList from '@/components/clients/ClientesList.vue'
import NewCliente from '@/components/modals/NewCliente.vue'
import FundoModais from '@/components/FundoModais.vue'
import { ref, onMounted } from 'vue'
import { useClientesStore } from '@/stores/UseClientesStore'

const isModalOpen = ref(false)

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value
}

const clientesStore = useClientesStore()

onMounted(() => {
    clientesStore.carregarClientes()
})
</script>

<template>
    <Teleport to="body" v-if="isModalOpen">
        <FundoModais :toggle-modal="toggleModal"></FundoModais>
        <NewCliente :toggle-modal="toggleModal"></NewCliente>
    </Teleport>

    <div class="container-clientes">
        <h1 class="h1 h1-top">
            Clientes
            <button class="button-select" @click="toggleModal" aria-label="Novo cliente">Novo cliente</button>
        </h1>

        <input type="text" class="input" placeholder="Buscar...">

        <p v-if="clientesStore.loading">Carregando clientes...</p>
        <p v-else-if="clientesStore.error" class="alert">{{ clientesStore.error }}</p>

        <ul v-else class="clientes-lista">
            <ClientesList
                v-for="cliente in clientesStore.clientes"
                :key="cliente.id"
                :id="cliente.id"
                :name="cliente.nome_completo"
                :email="cliente.email"
                :tel="cliente.telefone"
            />
        </ul>

        <p v-if="!clientesStore.loading && clientesStore.clientes.length === 0" class="alert">
            Nenhum cliente encontrado.
        </p>
    </div>
</template>

<style lang="scss">
.container-clientes {
    padding: 16px 24px;
    @include flex(column, center, start);
    gap: 32px;
    margin: calc(80px + 16px) 0;
    transition: 1s;

    h1 {
        @include flex(row, space-between, center);
        padding-right: 24px;

        .button-select {
            cursor: pointer;
        }
    }

    .input {
        width: 100%;
    }

    .clientes-lista {
        width: 100%;
        @include flex(column, start, start);
        gap: 16px;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    @media all and (min-width: 768px) {
        padding-left: calc(256px + 32px);
        margin-bottom: 16px;
    }
}
</style>