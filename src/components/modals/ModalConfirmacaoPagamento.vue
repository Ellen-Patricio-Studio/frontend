<script setup>

import { Icon } from '@iconify/vue';

defineProps({
    mensagem: String,
})

const recharge = () => {
    window.location.reload()
}

</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Mensagem</p>
            <!-- <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal"/> -->
        </div>
        <hr>
            <p>{{mensagem}}</p>
            <button class="button-rosa" @click="recharge">Ok</button>
    </div>
</template>

<style lang="scss">


</style>
