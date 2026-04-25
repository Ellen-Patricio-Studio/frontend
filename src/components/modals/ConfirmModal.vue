<script setup>
import { Icon } from '@iconify/vue';
import { useAgendamentosStore } from '@/stores/useAgendamentosStore';
import { ref } from 'vue';

const agendamentosStore = useAgendamentosStore()
const allert = ref('')

const props = defineProps({
    id: Number,
    toggleModal: Function,

    title: String,
    acao: String,
})

const confirmar = async (id) => {

    const response = await agendamentosStore.confirmarAgendamento(id)

    if (response.success) {
        window.location.reload();
    } else {
        allert.value = response.error
    }
}

const cancelar = async (id) => {

    const response = await agendamentosStore.cancelarAgendamento(id)

    if (response.success) {
        window.location.reload();
    } else {
        allert.value = response.error
    }
}

const realizar = async (id) => {

    const response = await agendamentosStore.realizarAgendamento(id)

    if (response.success) {
        window.location.reload();
    } else {
        allert.value = response.error
    }
}

const ausentar = async (id) => {

    const response = await agendamentosStore.ausentarAgendamento(id)

    if (response.success) {
        window.location.reload();
    } else {
        allert.value = response.error
    }
}

</script>

<template>
    <div class="box box-modal box-resume-appointment">
        <div class="top">
            <p class="title">{{title}}</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal(acao)"/>
        </div>
        <hr>
        <div class="info">
             <div class="resume-details">
                <p>Tem certeza que deseja {{ acao }}?</p>
             </div>
             <p v-if="allert !== ''" class="alert">{{ allert }}</p>
             <div class="buttons">
                 <button class="button-rosa button-voltar" @click.prevent="toggleModal(acao)">Cancelar</button>
                 <button class="button-rosa" 
                    @click.prevent="() => {
                        acao === 'confirmar' ? confirmar(id) : 
                        acao === 'cancelar'  ? cancelar(id) :
                        acao === 'realizar'  ? realizar(id) : ausentar(id)
                        }">
                    
                    Confirmar
                </button>
             </div>
        </div>
    </div>
</template>

<style lang="scss">
.box-resume-appointment {
    .info {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 16px 0;

        .resume-details {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .detail-item {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--cinza-nav);
                
                &.total {
                    margin-top: 8px;
                    font-size: 1.1rem;
                    color: var(--rosa-nav);
                }
            }
        }
    }

    .buttons {
        width: 100%;
        @include flex(row, space-between, center);
        gap: 16px;

        .button-rosa {
            width: 100%;
            height: 40px;
            cursor: pointer;
        }
    }
}
</style>