<script setup>

import { Icon } from '@iconify/vue';
import { ref, onMounted } from 'vue';
import { useServiceStore } from '@/stores/useServiceStore';
import { useCategorias } from '@/composables/useCategory';

const { categorias, isLoading } = useCategorias()
const serviceStore = useServiceStore()
const alert = ref('')

const dataForm = ref({
    id_categoria: 1,
    nome_servico: '',
    duracao_minutos: 0,
    valor: 0
})

const props = defineProps({
    toggleModal: Function
})



const cadastrarServico = async () => {
    // Validação básica
    if (!dataForm.value.id_categoria || !dataForm.value.nome_servico) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    const response = await serviceStore.cadastrarServico(dataForm.value);
    
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
            <p class="title">Novo serviço</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal('newService')" aria-label="Fechar"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="cadastrarServico">
            <div class="wrapper-input">
                <label>Nome</label>
                <input v-model="dataForm.nome_servico" type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Duração</label>
                <input v-model="dataForm.duracao_minutos" type="number" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Valor</label>
                <input v-model="dataForm.valor" type="number" name="" id="" class="input">
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
            <p v-if="alert !== ''" class="alert">{{ alert }}</p>
            <button class="button-rosa button-voltar" @click.prevent="toggleModal('newService')" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">



</style>
