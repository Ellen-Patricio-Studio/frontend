<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useEquipeStore } from '@/stores/useEquipeStore';
import { ref, watch } from 'vue';
import { usePhoneMask } from '@/composables/usePhoneMask';


const equipeStore = useEquipeStore()
const alert = ref('')

defineProps({
    toggleModal: Function
})

const dataForm = ref({
    nome_completo: '',
    email: '',
    telefone: '',
    senha: '',
    confirmar_senha: '',
    ids_categorias: [1]
})

const { formatPhone } = usePhoneMask()
watch(() => dataForm.value.telefone, (val) => {
  dataForm.value.telefone = formatPhone(val)
})

const enviar = async () => {
    const response = await equipeStore.cadastrarFuncionario(dataForm.value)
    if(response.success){
        toggleModal()
    }
}

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Novo funcionário</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="enviar()" >
            <div class="wrapper-input">
                <label>Foto de perfil</label>
                <img :src="imgAvatar" alt="Foto de perfil">
                <div class="buttons">
                    <button class="button-select">Editar</button>
                    <button class="button-select button-remove">Remover</button>
                </div>
            </div>
            <div class="wrapper-input">
                <label>Nome completo</label>
                <input v-model="dataForm.nome_completo" type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Email</label>
                <input v-model="dataForm.email" type="email" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Telefone</label>
                <input v-model="dataForm.telefone" type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Senha</label>
                <input v-model="dataForm.senha" type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Repita a senha</label>
                <input v-model="dataForm.confirmar_senha" type="password" name="" id="" class="input">
            </div>
            <p v-if="dataForm.senha !== dataForm.confirmar_senha" class="alert">As senhas não conferem</p>
            <!-- <div class="wrapper-input">
                <label class="service-wrapper">Serviços  <Icon class="icon" icon="mingcute:add-fill" /> </label>
                <select class="input">
                    <option value="1">Cabeleireiro</option>
                    <option value="1">Manicure</option>
                    <option value="1">Pedicure</option>
                    <option value="1">Geral</option>
                </select>
            </div> -->
            <!-- <div class="wrapper-input">
                <label>Cargo</label>
                <select class="input">
                    <option value="1">Funcionário</option>
                    <option value="1">Administrador</option>
                </select>
            </div> -->
            <button class="button-rosa button-voltar" @click="toggleModal">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">



</style>
