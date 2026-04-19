<script setup>

import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar serviço</p>
            <Icon class="icon" icon="mingcute:close-fill"/>
        </div>
        <hr>
        <form class="form" action="">
            <div class="wrapper-input">
                <label>Categoria</label>
                <select class="input">
                    <option value="1">Cabelo</option>
                    <option value="1">Mãos</option>
                    <option value="1">Olhos</option>
                </select>
            </div>
            <div class="wrapper-input">
                <label>Descrição</label>
                <textarea class="input" ></textarea>
            </div>
            <div class="two-wrappers">
                <div class="wrapper-input">
                    <label>Duração</label>
                    <input type="number" name="" id="" class="input">
                </div>
                <div class="wrapper-input">
                    <label>Valor</label>
                    <input type="number" name="" id="" class="input">
                </div>
            </div>
            <div class="wrapper-input wrapper-check">
                <input type="checkbox" name="" id="">
                <label>Ativo?</label>
            </div>
            <button class="button-rosa button-voltar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">



</style>
