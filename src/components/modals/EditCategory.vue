<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useServiceStore } from '@/stores/useServiceStore';

const serviceStore = useServiceStore()
const alert = ref('')

const props = defineProps({
    ativo: Boolean,
    id: Number,
    nome: String,
    toggleModal: Function
})
const nome_categoria = ref(props.nome)
const ativo = ref(props.ativo)

const atualizar = async () => {
    const response = await serviceStore.editarCategoria(props.id, {nome_categoria: nome_categoria.value, ativo: ativo.value});
    
    if (response.success) {
        window.location.reload()
    } else {
        alert.value = response.message;
    }
}

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar categoria</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal('editCategory')" aria-label="Fechar"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="atualizar">
            <div class="wrapper-input">
                <label>Nome</label>
                <input v-model="nome_categoria" type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input wrapper-check">
                <input v-model="ativo" type="checkbox" name="" id="">
                <label>Ativo?</label>
            </div>
            <p v-if="alert !== ''" class="alert">{{ alert }}</p>
            <button class="button-rosa button-voltar" @click.prevent="toggleModal('editCategory')" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">



</style>
