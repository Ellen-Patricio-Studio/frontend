<script setup>
defineProps({
    transacao: Object,
    categorias: Array,
})
    
</script>

<template>
    <li class="item">
        <p>{{ transacao.id }}</p>
        <p>{{ transacao.data_criacao }}</p>
        <p>{{ transacao.nome_lancamento }}</p>
        <p>{{ transacao.id_agendamento }}</p>
        <!-- <p>{{ categorias[transacao.id_categoria_financeira] }}</p> -->
        <p>{{ transacao.valor }}</p>
        <p>{{ transacao.forma_pagamento }}</p>
        <p>{{ transacao.status_pagamento }}</p>
        <p>{{ transacao.data_pagamento }}</p>
        <button>...</button>
    </li>
</template>

<style lang="scss">

</style>