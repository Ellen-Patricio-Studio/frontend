<script setup>

import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar agendamento</p>
            <Icon class="icon" icon="mingcute:close-fill"/>
        </div>
        <hr>
        <form class="form" action="">
            <div class="wrapper-input">
                <label class="service-wrapper">Serviço <Icon class="icon" icon="mingcute:add-fill" /> </label>
                <select class="input">
                    <option value="1">Corte de cabelo</option>
                    <option value="1">Manicure</option>
                    <option value="1">Cílios</option>
                </select>
            </div>
            <div class="wrapper-input">
                <label>Profissional</label>
                <select class="input">
                    <option value="1">Ellen Patricio</option>
                    <option value="1">Augusto Fernandes</option>
                    <option value="1">Patricia Moreira</option>
                </select>
            </div>
            <div class="wrapper-input">
                <label>Data e horário</label>
                <input type="datetime-local" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label for="">Observação</label>
                <textarea name="" id="" class="input"></textarea>
            </div>
            <button class="button-rosa button-voltar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">



</style>
