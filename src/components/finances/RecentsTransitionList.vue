<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import FundoModais from '../FundoModais.vue';
import ModalPagamento from '../modals/ModalPagamento.vue';
import ModalConfirmacaoPagamento from '../modals/ModalConfirmacaoPagamento.vue';

const props = defineProps({
    transacao: Object,
    categorias: Array,
})

const isModalOpen = ref({
    conciliar_pagamento: false,
})
const toggleModal = (modal) => {
    isModalOpen.value[modal] = !isModalOpen.value[modal];
}

const confirmationModal = ref(false)
const toggleConfirmationModal = () => {
    confirmationModal.value = !confirmationModal.value

    function recharge(){
        window.location.reload()
    }
} 
 
</script>

<template>
    <li class="item">
        <teleport to="body" v-if="isModalOpen.conciliar_pagamento">
            <FundoModais :toggle-modal=" () => toggleModal('conciliar_pagamento')"></FundoModais>
            <ModalPagamento :toggle-confirmation-modal="toggleConfirmationModal" :toggle-modal="() => toggleModal('conciliar_pagamento')" :id="props.transacao.id"></ModalPagamento>
        </teleport>
        <teleport to="body" v-if="confirmationModal">
            <FundoModais :toggle-modal=" () => {}"></FundoModais>
            <ModalConfirmacaoPagamento mensagem="O serviço foi pago."></ModalConfirmacaoPagamento>
        </teleport>
        <p>{{ transacao.id }}</p>
        <p>{{ transacao.data_criacao }}</p>
        <p>{{ transacao.nome_lancamento }}</p>
        <p>{{ transacao.id_agendamento }}</p>
        <!-- <p>{{ categorias[transacao.id_categoria_financeira] }}</p> -->
        <p>{{ transacao.valor }}</p>
        <p>{{ transacao.forma_pagamento }}</p>
        <p>{{ transacao.status_pagamento }}</p>
        <p>{{ transacao.data_pagamento }}</p>
        <div class="button-item">
            <Icon @click="toggleModal('conciliar_pagamento')" class="icon" icon="material-symbols-light:subtitles-gear-outline" v-if="transacao.status_pagamento !== 'PAGO'">...</Icon>
        </div>
    </li>
</template>

<style lang="scss">
    .finances-container-admin{
        .recent-transitions-list{
            .button-item{
                height: 100%;
                flex: 1;
                @include flex(row, center, center);

                .icon{
                    color: var(--cinza-nav);
                    width: 20px;
                    height: 20px;
                    cursor: pointer;
                }
            }
        }
    }
</style>