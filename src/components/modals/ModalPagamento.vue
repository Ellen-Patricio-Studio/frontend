<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useEquipeStore } from '@/stores/useEquipeStore';
import { ref, watch } from 'vue';
import { usePhoneMask } from '@/composables/usePhoneMask';
import { useServiceStore } from '@/stores/useServiceStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { useFinanceiroStore } from '@/stores/useFinanceiroStore';

const financeiroStore = useFinanceiroStore()
const auth = useAuthStore()
const serviceStore = useServiceStore()
const equipeStore = useEquipeStore()
const allert = ref('')
const alert2 = ref('')

const props = defineProps({
    id: Number,
    toggleModal: Function,
    toggleConfirmationModal: Function
})

const categoriasSelecionadas = ref([null]);


const dataForm = ref('Pix')

const enviar = async () => {
    if(dataForm.value === '' ){
        alert2.value = 'Favor selecionar categoria'
        return
    }
    console.log({'forma_pagamento': dataForm.value})
    const response = await financeiroStore.conciliarPagamento(props.id, dataForm.value)
    if(response.success){
        props.toggleModal()
        props.toggleConfirmationModal()
    } else{
        alert2.value = response.message
    }
}


</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Conciliar pagamento</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="enviar()" >
            <div class="wrapper-input">
                <label>Selecione a forma de pagamento</label>
                <select v-model="dataForm" class="input">
                    <option value="Crédito">Crédito</option>
                    <option value="Débito">Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                    <option value="Pix">PIX</option>
                </select>
            </div>
            <p v-if="alert2 !== ''" class="alert">{{alert2}}</p>
            <button class="button-rosa button-voltar" @click="toggleModal">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">


</style>
