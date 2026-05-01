<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { usePhoneMask } from '@/composables/usePhoneMask';
import { ref } from 'vue';
import { watch } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const alert = ref('')
const authStore = useAuthStore()

const props = defineProps({
    data: Object,
    toggleModal: Function
})

const dataForm = ref({
        nome_completo: props.data.nome_completo,
        email: props.data.email,
        telefone: props.data.telefone,
})

const { formatPhone } = usePhoneMask()
watch(() => dataForm.value.telefone, (val) => {
  dataForm.value.telefone = formatPhone(val)
})

const atualizarPerfil = async () => {
    const response = await authStore.atualizarPerfil(dataForm.value);
    if (response.success) {
        window.location.reload();
    } else {
        alert.value = response.message;
    }
};

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar perfil</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()" aria-label="Fechar" />
        </div>
        <hr>
        <form class="form" @submit.prevent="atualizarPerfil">
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
            <!-- <div class="wrapper-input">
                <label class="service-wrapper">Serviços  <Icon class="icon" icon="mingcute:add-fill" /> </label>
                <select class="input">
                    <option value="1">Corte de cabelo</option>
                    <option value="1">Manicure</option>
                    <option value="1">Pedicure</option>
                </select>
            </div> -->
            <p v-if="alert" class="alert">{{alert}}</p>
            <button class="button-rosa button-voltar" @click.prevent="toggleModal" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">



</style>
