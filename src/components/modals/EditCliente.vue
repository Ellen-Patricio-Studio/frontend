<!-- components/modals/EditCliente.vue -->
<script setup>
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'
import { useClientesStore } from '@/stores/UseClientesStore'
import { usePhoneMask } from '@/composables/usePhoneMask'

const clientesStore = useClientesStore()
const alertMsg = ref('')

const props = defineProps({
    toggleModal: Function,
    cliente: Object
})

const dataForm = ref({
    nome_completo: props.cliente?.nome_completo || '',
    email: props.cliente?.email || '',
    telefone: props.cliente?.telefone || '',
    nova_senha: '',
    confirmar_senha: ''
})

const { formatPhone } = usePhoneMask()
watch(() => dataForm.value.telefone, (val) => {
    dataForm.value.telefone = formatPhone(val)
})

const enviar = async () => {
    alertMsg.value = ''

    if (dataForm.value.nova_senha && dataForm.value.nova_senha !== dataForm.value.confirmar_senha) {
        alertMsg.value = 'As senhas não conferem.'
        return
    }

    const payload = {
        nome_completo: dataForm.value.nome_completo,
        email: dataForm.value.email,
        telefone: dataForm.value.telefone
    }

    if (dataForm.value.nova_senha) {
        payload.nova_senha = dataForm.value.nova_senha
    }

    const response = await clientesStore.editarCliente(props.cliente.id, payload)
    if (response.success) {
        await clientesStore.buscarPorId(props.cliente.id)
        window.location.reload();
    } else {
        alertMsg.value = response.error
    }
}
</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar cliente</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal" aria-label="Fechar"/>
        </div>
        <hr>
        <form class="form scroll" @submit.prevent="enviar()">
            <div class="wrapper-input">
                <label>Nome completo</label>
                <input v-model="dataForm.nome_completo" type="text" class="input" required>
            </div>
            <div class="wrapper-input">
                <label>Email</label>
                <input v-model="dataForm.email" type="email" class="input" required>
            </div>
            <div class="wrapper-input">
                <label>Telefone</label>
                <input v-model="dataForm.telefone" type="text" class="input">
            </div>
            <div class="wrapper-input">
                <label>Nova senha <span style="opacity:0.5; font-size:12px">(deixe em branco para não alterar)</span></label>
                <input v-model="dataForm.nova_senha" type="password" class="input">
            </div>
            <div class="wrapper-input" v-if="dataForm.nova_senha">
                <label>Repita a nova senha</label>
                <input v-model="dataForm.confirmar_senha" type="password" class="input">
            </div>
            <p v-if="dataForm.nova_senha && dataForm.nova_senha !== dataForm.confirmar_senha" class="alert">
                As senhas não conferem
            </p>
            <p v-if="alertMsg" class="alert">{{ alertMsg }}</p>
            <button type="button" class="button-rosa button-voltar" @click="toggleModal" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Salvar alterações" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>