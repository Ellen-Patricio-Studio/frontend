<script setup>
import { Icon } from '@iconify/vue';
import { useBooking } from '@/composables/useBooking';

const { bookingData, totalPreco } = useBooking();

const props = defineProps({
    agendar: Function,
    toggleModal: Function,
    alertt: String
})
</script>

<template>
    <div class="box box-modal box-resume-appointment">
        <div class="top">
            <p class="title">Resumo de agendamento</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()"/>
        </div>
        <hr>
        <div class="info">
             <div class="resume-details">
                <div class="detail-item">
                    <Icon icon="fa7-solid:gears" />
                    <span><strong>Serviço:</strong> {{ bookingData._temp.nome_servico }}</span>
                </div>
                <div class="detail-item">
                    <Icon icon="clarity:employee-solid" />
                    <span><strong>Profissional:</strong> {{ bookingData._temp.nome_funcionario }}</span>
                </div>
                <div class="detail-item">
                    <Icon icon="solar:calendar-broken" />
                    <span><strong>Data:</strong> {{ bookingData.data_atendimento }} às {{ bookingData.hora_inicio }}</span>
                </div>
                <div class="detail-item total">
                    <span><strong>Total:</strong> R$ {{ totalPreco.toFixed(2).replace('.', ',') }}</span>
                </div>
             </div>
             <p v-if="alertt !== ''" class="alert">{{ alertt }}</p>
             <div class="buttons">
                 <button class="button-rosa button-voltar" @click.prevent="toggleModal()">Cancelar</button>
                 <button class="button-rosa" @click.prevent="agendar()">Confirmar</button>
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