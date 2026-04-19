<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Editar perfil</p>
            <Icon class="icon" icon="mingcute:close-fill"/>
        </div>
        <hr>
        <form class="form" action="">
            <div class="wrapper-input">
                <label>Foto de perfil</label>
                <img :src="imgAvatar" alt="Foto de perfil">
                <div class="buttons">
                    <button class="button-select">Editar</button>
                    <button class="button-select button-remove">Remover</button>
                </div>
            </div>
            <div class="wrapper-input">
                <label>Nome completo</label>
                <input type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Email</label>
                <input type="email" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Telefone</label>
                <input type="number" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label class="service-wrapper">Serviços  <Icon class="icon" icon="mingcute:add-fill" /> </label>
                <select class="input">
                    <option value="1">Corte de cabelo</option>
                    <option value="1">Manicure</option>
                    <option value="1">Pedicure</option>
                </select>
            </div>
            <button class="button-rosa button-voltar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">



</style>
