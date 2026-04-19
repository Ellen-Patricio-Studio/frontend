<script setup>

import { Icon } from '@iconify/vue';

</script>

<template>
    <div class="box box-modal password-modal">
        <div class="top">
            <p class="title">Editar senha</p>
            <Icon class="icon" icon="mingcute:close-fill"/>
        </div>
        <hr>
        <form class="form" action="">
            <div class="wrapper-input">
                <label>Senha atual</label>
                <input type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Nova senha</label>
                <input type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Repita a senha</label>
                <input type="password" name="" id="" class="input">
            </div>
            <p class="alert">* Senha atual não corresponde</p>
            <button class="button-rosa button-voltar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">

.password-modal{
    .alert{
        align-self: start;
        font-size: 12px;

        
    }
}

</style>
