<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useServiceStore } from '@/stores/useServiceStore';

const serviceStore = useServiceStore()
const nome_categoria = ref('')
const alert = ref('')

const props = defineProps({
    toggleModal: Function
})

const cadastrar = async () => {
    console.log(nome_categoria.value)
    const response = await serviceStore.cadastrarCategoria(nome_categoria.value);
    
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
            <p class="title">Nova categoria</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal('newCategory')"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="cadastrar">
            <div class="wrapper-input">
                <label>Nome</label>
                <input v-model="nome_categoria" type="text" name="" id="" class="input">
            </div>
            <p v-if="alert !== ''" class="alert">{{ alert }}</p>
            <button class="button-rosa button-voltar" @click.prevent="toggleModal('newCategory')">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">



</style>
