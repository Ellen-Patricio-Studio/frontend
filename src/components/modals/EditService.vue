<script setup>

import { Icon } from '@iconify/vue';
import { ref, onMounted } from 'vue';
import { useServiceStore } from '@/stores/useServiceStore';
import { useCategorias } from '@/composables/useCategory';

const { categorias, isLoading } = useCategorias()
const serviceStore = useServiceStore()
const alert = ref('')

const props = defineProps({
    id: Number,
    id_categoria: Number,
    name: String,
    time: String,
    value: String,
    active: Boolean,
    toggleModal: Function
})

const dataForm = ref({
    id_categoria: props.id_categoria || '',
    nome_servico: props.name,
    duracao_minutos: props.time,
    valor: props.value,
    ativo: props.active
})

const atualizarServico = async () => {
    console.log(dataForm.value)
    const response = await serviceStore.editarServico(props.id, dataForm.value);

    
    if (response.success) {

        window.location.reload();
    } else {
        alert.value = response.message;
    }
}

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar serviço</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()" aria-label="Fechar"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="atualizarServico">
            <div class="wrapper-input">
                <label>Nome</label>
                <input v-model="dataForm.nome_servico" type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Duração</label>
                <input v-model.number="dataForm.duracao_minutos" type="number" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Valor</label>
                <input v-model.number="dataForm.valor" type="number" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Categoria</label>
                <select v-model="dataForm.id_categoria" class="input" :disabled="isLoading">
                    <option value="" disabled="">Selecione uma categoria</option>
                    <option 
                        v-for="categoria in categorias"    
                        :key="categoria.id"
                        :value="categoria.id"
                        >
                            {{ categoria.nome_categoria }}
                    </option>
                </select>
            </div>
            <div class="wrapper-input wrapper-check">
                <input v-model="dataForm.ativo" type="checkbox" name="" id="">
                <label>Ativo?</label>
            </div>
            <p v-if="alert !== ''" class="alert">{{ alert }}</p>
            <button class="button-rosa button-voltar" @click.prevent="toggleModal()" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">



</style>
