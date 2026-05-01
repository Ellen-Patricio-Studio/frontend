<!-- components/modals/NewCliente.vue -->
<script setup>
import { Icon } from '@iconify/vue'
import { ref, watch } from 'vue'
import { useClientesStore } from '@/stores/UseClientesStore'
import { usePhoneMask } from '@/composables/usePhoneMask'

const clientesStore = useClientesStore()
const alertMsg = ref('')

defineProps({
    toggleModal: Function
})

const dataForm = ref({
    nome_completo: '',
    email: '',
    telefone: '',
    senha: '',
    confirmar_senha: ''
})

const { formatPhone } = usePhoneMask()
watch(() => dataForm.value.telefone, (val) => {
    dataForm.value.telefone = formatPhone(val)
})

const enviar = async () => {
    alertMsg.value = ''

    if (dataForm.value.senha !== dataForm.value.confirmar_senha) {
        alertMsg.value = 'As senhas não conferem.'
        return
    }

    const payload = {
        nome_completo: dataForm.value.nome_completo,
        email: dataForm.value.email,
        telefone: dataForm.value.telefone,
        senha: dataForm.value.senha,
        confirmar_senha: dataForm.value.confirmar_senha
    }

    const response = await clientesStore.cadastrarCliente(payload)
    if (response.success) {
        await clientesStore.carregarClientes()
        window.location.reload()
    } else {
        alertMsg.value = response.error
    }
}
</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Novo cliente</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal" aria-label="Fechar" />
        </div>
        <hr>
        <form class="form scroll" @submit.prevent="enviar()" >
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
                <label>Senha</label>
                <input v-model="dataForm.senha" type="password" class="input" required>
            </div>
            <div class="wrapper-input">
                <label>Repita a senha</label>
                <input v-model="dataForm.confirmar_senha" type="password" class="input" required>
            </div>
            <p v-if="dataForm.senha && dataForm.confirmar_senha && dataForm.senha !== dataForm.confirmar_senha" class="alert">
                As senhas não conferem
            </p>
            <p v-if="alertMsg" class="alert">{{ alertMsg }}</p>
            <button type="button" class="button-rosa button-voltar" @click="toggleModal" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">
// Herda os estilos globais de .box-modal já definidos no projeto
</style>