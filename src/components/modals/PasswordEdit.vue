<script setup>

import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const alert = ref('')

const authStore = useAuthStore()

const props = defineProps({
    data: Object,
    toggleModal: Function
})

const senha_atual = ref('')
const nova_senha = ref('')
const confirmar_nova_senha = ref('')

const alterarSenha = async () => {
    const payload = {
        nome_completo: props.data.nome_completo,
        email: props.data.email,
        telefone: props.data.telefone,
        senha_atual: senha_atual.value,
        nova_senha: nova_senha.value,
        confirmar_nova_senha: confirmar_nova_senha.value
    }
    console.log(payload)
    const response = await authStore.atualizarPerfil(payload);
    if (response.success) {
        window.location.reload();
    } else {
        alert.value = response.message;
    }
};

</script>

<template>
    <div class="box box-modal password-modal">
        <div class="top">
            <p class="title">Editar senha</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()" aria-label="Fechar"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="alterarSenha">
            <div class="wrapper-input">
                <label>Senha atual</label>
                <input v-model="senha_atual" type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Nova senha</label>
                <input v-model="nova_senha" type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Repita a senha</label>
                <input v-model="confirmar_nova_senha" type="password" name="" id="" class="input">
            </div>
            <p v-if="alert" class="alert">{{alert}}</p>
            <p v-if="nova_senha !== confirmar_nova_senha" class="alert">As senhas não correspondem</p>
            <button class="button-rosa button-voltar" @click="toggleModal" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">

.password-modal{
    .alert{
        align-self: start;
        font-size: 12px;

        
    }
}

</style>
