<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { ref, watch } from 'vue';
import { usePhoneMask } from '@/composables/usePhoneMask';
import { useEquipeStore } from '@/stores/useEquipeStore';

const equipeStore = useEquipeStore()

const props = defineProps({
    id: Number,
    name: String,
    email: String,
    tel: String,
    active: Boolean,
    toggleModal: Function
})

const dataForm = ref({
    nome_completo: props.name,
    email: props.email,
    telefone: props.tel,
    nova_senha: '',
    confirmar_nova_senha: '',
    ativo: props.active,
    ids_categorias: [1]
})

watch(() => props.name, () => {
    dataForm.value.nome_completo = props.name;
    dataForm.value.email = props.email;
    dataForm.value.telefone = props.tel;
    dataForm.value.ativo = props.active;
}, { immediate: true })

const { formatPhone } = usePhoneMask()
watch(() => dataForm.value.telefone, (val) => {
  dataForm.value.telefone = formatPhone(val)
})

const atualizar = async () => {
    const response = await equipeStore.atualizarFuncionario(props.id, dataForm.value)
    if(response.success){
        window.location.reload();
    }
}

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar funcionário</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()"/>
        </div>
        <hr>
        <form @submit.prevent="atualizar" class="form">
            <!-- <div class="wrapper-input">
                <label>Foto de perfil</label>
                <img :src="imgAvatar" alt="Foto de perfil">
                <div class="buttons">
                    <button class="button-select">Editar</button>
                    <button class="button-select button-remove">Remover</button>
                </div>
            </div> -->
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
                <label>Nova senha</label>
                <input v-model="dataForm.nova_senha" type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Repita a nova senha</label>
                <input v-model="dataForm.confirmar_nova_senha" type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input wrapper-check">
                <input v-model="dataForm.ativo" type="checkbox" name="" id="">
                <label>Ativo?</label>
            </div>
            <p v-if="dataForm.nova_senha !== dataForm.confirmar_nova_senha" class="alert">As senhas não conferem</p>
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
