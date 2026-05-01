<script setup>
import { Icon } from '@iconify/vue';



</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Deletar serviço</p>
            <Icon class="icon" icon="mingcute:close-fill" aria-label="Fechar"/>
        </div>
        <hr>
        <p>Tem certeza que deseja excluir esse serviço?</p>
        <button class="button-voltar button-rosa" aria-label="Cancelar">Cancelar</button>
        <button class="button-rosa" aria-label="Confirmar">Confirmar</button>
    </div>
</template>

<style lang="scss">



</style>
