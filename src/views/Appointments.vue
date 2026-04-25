<script setup>
import { onMounted, ref, computed } from 'vue';
import { useAgendamentosStore } from '@/stores/useAgendamentosStore';
import { useAuthStore } from '@/stores/useAuthStore';
import AppointmentsList from '@/components/appointments/AppointmentsList.vue';
import MobileCalendar from '@/components/appointments/MobileCalendar.vue';
import imgAvatar from '@/assets/images/logo.jpeg'

const agendamentosStore = useAgendamentosStore();
const auth = useAuthStore();

const busca = ref('');
const filtroStatus = ref('');

const agendamentoSelecionado = ref(null);

const selecionarAgendamento = (agendamento) => {
    agendamentoSelecionado.value = agendamento;
};

onMounted(() => {
    if (auth.isAdmin) {
        agendamentosStore.fetchTodosAgendamentos();
    } else {
        agendamentosStore.fetchMeusAgendamentos();
    }
});

// Lógica de filtragem para a lista
const agendamentosFiltrados = computed(() => {
    return agendamentosStore.agendamentos.filter(a => {
        const matchesBusca = a.cliente.toLowerCase().includes(busca.value.toLowerCase()) || 
                             a.servico.toLowerCase().includes(busca.value.toLowerCase());
        const matchesStatus = filtroStatus.value ? a.status === filtroStatus.value : true;
        return matchesBusca && matchesStatus;
    });
});
</script>

<template>
    <div class="appointment-container">
        <h1 class="h1 h1-top">Agendamentos</h1>
        <div class="appointment-content">
            <div class="appointment-calendar box">
                <MobileCalendar :appointments-data="agendamentosFiltrados"></MobileCalendar>
            </div>
            
            <ul class="appointments-box box">
                <div class="top">
                    <h2 class="h2">Lista de agendamentos</h2>
                    <input v-model="busca" type="text" placeholder="Buscar por cliente ou serviço..." class="input">
                    <div class="selects">
                        <select v-model="filtroStatus" class="button-select">
                            <option value="">Todos os Status</option>
                            <option value="AGENDADO">Agendado</option>
                            <option value="CONFIRMADO">Confirmado</option>
                            <option value="REALIZADO">Realizado</option>
                            <option value="CANCELADO">Cancelado</option>
                            <option value="AUSENTE">Ausente</option>
                        </select>
                    </div>
                </div>

                <AppointmentsList 
                    v-for="item in agendamentosFiltrados" 
                    :key="item.id"
                    :id="item.id"
                    :src="imgAvatar" 
                    :name="item.cliente" 
                    :professional="item.funcionario" 
                    :status="item.status" 
                    :role="item.servico"
                    :hour="item.horario"
                    :date="item.data"
                />

                <div v-if="agendamentosStore.loading">Carregando...</div>
                <div v-if="agendamentosFiltrados.length === 0 && !agendamentosStore.loading">
                    Nenhum agendamento encontrado.
                </div>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    .appointment-container{
        margin-top: 120px;
        padding: 16px 24px;
        @include flex(column, center, center);
        gap: 32px;
        width: 100%;
        overflow: hidden;
        margin: calc(80px + 16px) 0;


        .appointment-content{
            @include flex(column, center, center);
            gap: 32px;
            width: 100%;
            max-width: 100%;
            height: auto;
        }
        
        .appointment-calendar{
            width: 100%;
        }

        .appointments-box{
            @include flex(column, center, center);
            gap: 16px;
            width: 100%;
            padding-top: 24px;

            .top{
                width: 100%;
                @include flex(column, center, start);
                gap: 16px;

                .input{
                    width: 100%;
                }

                .selects{
                    width: 100%;
                    @include flex(row, space-between, center);
                    gap: 16px;

                    select{
                        width: 100%;
                        flex: 1;
                    }
                }
            }
        }

        @media all and (min-width: 768px){  
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;
            

            .appointment-content{
                flex-direction: row;
                align-items: stretch;
                flex-wrap: wrap;
            }

            .appointment-calendar{
                flex: 2;
                min-width: 400px;
            }
            
            .appointments-box{
                flex: 1;
                min-width: 300px;
                justify-content: start;

                
            }

        }
    }
</style>
