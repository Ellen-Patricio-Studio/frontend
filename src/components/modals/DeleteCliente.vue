<!-- components/modals/DeleteCliente.vue -->
<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useClientesStore } from '@/stores/UseClientesStore'
import { useRouter } from 'vue-router'

const clientesStore = useClientesStore()
const router = useRouter()
const alertMsg = ref('')
const loading = ref(false)

const props = defineProps({
    toggleModal: Function,
    cliente: Object
})

const confirmarExclusao = async () => {
    loading.value = true
    alertMsg.value = ''

    const response = await clientesStore.excluirCliente(props.cliente.id)
    if (response.success) {
        router.push({ name: 'clientes' })
    } else {
        alertMsg.value = response.error
        loading.value = false
    }
}
</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Excluir cliente</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal" aria-label="Fechar"/>
        </div>
        <hr>
        <div class="form">
            <div class="delete-warning">
                <Icon icon="mingcute:warning-fill" class="warning-icon" />
                <p>Tem certeza que deseja excluir a conta de <strong>{{ cliente?.nome_completo }}</strong>? Esta ação não pode ser desfeita.</p>
            </div>
            <p v-if="alertMsg" class="alert">{{ alertMsg }}</p>
            <button type="button" class="button-rosa button-voltar" @click="toggleModal" aria-label="Cancelar">Cancelar</button>
            <button
                type="button"
                class="button-rosa button-danger"
                @click="confirmarExclusao"
                :disabled="loading"
                aria-label="Confirmar exclusão"
            >
                {{ loading ? 'Excluindo...' : 'Confirmar exclusão' }}
            </button>
        </div>
    </div>
</template>

<style lang="scss">
.delete-warning {
    @include flex(row, start, center);
    gap: 12px;
    background: rgba(160, 30, 30, 0.08);
    border-radius: 8px;
    padding: 16px;

    .warning-icon {
        font-size: 24px;
        color: rgb(160, 30, 30);
        flex-shrink: 0;
    }

    p {
        font-size: 14px;
        line-height: 1.5;
    }
}

.button-danger {
    background-color: rgb(160, 30, 30) !important;
    color: #fff !important;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>