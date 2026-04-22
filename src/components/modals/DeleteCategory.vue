<script setup>
import { Icon } from '@iconify/vue';

defineProps({

    toggleModal: Function
})

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Deletar categoria</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal('deleteCategory')"/>
        </div>
        <hr>
        <p>Tem certeza que deseja excluir essa categoria?</p>
        <button class="button-voltar button-rosa" @click="toggleModal('deleteCategory')">Cancelar</button>
        <button class="button-rosa">Confirmar</button>
    </div>
</template>

<style lang="scss">



</style>
