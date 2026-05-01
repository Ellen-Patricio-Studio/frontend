<script setup>
import { ref, watch, onMounted } from 'vue';
import { useBooking } from '@/composables/useBooking';
import { useDisponibilidadeStore } from '@/stores/useDisponibilidadeStore';
import ButtonTime from '@/components/buttons/ButtonTime.vue';
import ActiveArea from '@/components/newAppointments/ActiveArea.vue';
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

const { bookingData, setHorario, totalPreco } = useBooking();
const dispStore = useDisponibilidadeStore();
const date = ref(new Date());

// Formata data para o back-end (DD/MM/AAAA)
const formatarData = (d) => {
    return d.toLocaleDateString('pt-BR');
};

// Busca horários sempre que a data mudar
watch(date, (novaData) => {
    if (bookingData.value.id_servico) {
        dispStore.buscarDisponibilidade(bookingData.value.id_servico, formatarData(novaData));
    }
}, { immediate: true });

// Pega todos os horários únicos disponíveis de todos os profissionais
const todosHorarios = computed(() => {
    const slots = dispStore.profissionaisDisponiveis.flatMap(p => p.slots.map(s => s.hora_inicio));
    return [...new Set(slots)].sort();
});

const selecionarHorario = (hora) => {
    setHorario(formatarData(date.value), hora);
};
</script>

<template>
    <div class="container-DateSelection">
        <div class="box">
            <h1 class="h1 h1-top">Selecionar data e horário</h1>
            <ActiveArea :activeData="true" />
            
            <div class="content">
                <div class="dates">
                    <VDatePicker class="teste" v-model="date" transparent borderless trim-weeks expanded :min-date="new Date()" />
                </div>
                <div class="times">
                    <p v-if="dispStore.loading">Carregando horários...</p>
                    <p v-else-if="todosHorarios.length === 0">Não há horários para este dia.</p>
                    
                    <ButtonTime 
                        v-for="hora in todosHorarios" 
                        :key="hora" 
                        :time="hora" 
                        :active="bookingData.hora_inicio === hora"
                        @click="selecionarHorario(hora)"   
                    />
                </div>
            </div>

            <div class="confirmation">
                <div class="finally-resume">
                    <p><Icon icon="fa7-solid:gears" class="icon"/> {{ bookingData._temp.nome_servico }}</p>
                    <p class="total">R$ {{ totalPreco.toFixed(2).replace('.', ',') }}</p>
                </div>
                <div class="right">
                    <RouterLink :to="{name: 'novo-agendamento'}" class="button-rosa button-voltar" aria-label="Voltar">Voltar</RouterLink>
                    <RouterLink 
                        v-if="bookingData.hora_inicio" 
                        :to="{name: 'selecionar-profissional'}" 
                        class="button-rosa"
                        aria-label="Prosseguir"
                    >Prosseguir</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .container-DateSelection{
        padding: 16px 24px;
        margin: calc(80px + 16px) 0;
        transition: 1s;
        font-size: 14px;

        .box{
            width: 100%;
            @include flex(column, center, start);
            gap: 32px;
            padding-top: 32px;
            padding-bottom: 32px;

            .confirmation{
                .selection{
                    @include flex(column, center, start);

                    .title{
                        font-size: 12px;
                        color: var(--cinza-nav);
                    }
                }
            }

            .content{
                width: 100%;
                @include flex(column, center, center);
                gap: 32px;
            }

            .teste{
                color: var(--cinza-nav);

            }

            .dates{
                width: 100%;
            }

            .times{
                width: 100%;
                @include flex(row, center, start);
                flex-wrap: wrap;
                gap: 16px;
            }
           
        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);

            .box{
                .content{
                    flex-direction: row;
                    align-items: start;
                    justify-content: start;
                    
    
                    .dates{
                        flex: 1;
                        max-width: 450px;
                    }
    
                    .times {
                        flex: 1.5;
    
                    }
                }

            }
        }
    }
</style>