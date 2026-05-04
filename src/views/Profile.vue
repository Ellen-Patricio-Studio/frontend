<script setup>
import { Icon } from '@iconify/vue';
import ShowProfile from '@/components/profiles/ShowProfile.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useEquipeStore } from '@/stores/useEquipeStore';
import { useAgendamentosStore } from '@/stores/useAgendamentosStore';
import { useAuthStore } from '@/stores/useAuthStore';

const auth = useAuthStore()
const agendamentosStore = useAgendamentosStore()
const route = useRoute()
const equipeStore = useEquipeStore()

const id = route.params.id

onMounted(async () => {
    await equipeStore.buscarPorId(id)
    await agendamentosStore.fetchTodosAgendamentos()
})

const agendamentosFiltrados = computed(() => {
    const agendamentos = agendamentosStore.agendamentos || []
    
    return agendamentos.filter(agendamento => {
        console.log(agendamento)
        return agendamento.funcionario == equipeStore.funcionarioSelecionado.nome_completo
    })
})


</script>

<template>
    <p v-if="equipeStore.loading">Carregando perfil...</p>
    <div v-elif="equipeStore.funcionarioSelecionado" class="container-profile">
        <div class="wrapper-name h1-top">
            <div class="names">
                <p>Equipe</p>
                <p>></p>
                <p>{{equipeStore.funcionarioSelecionado?.nome_completo}}</p>
            </div>
            <RouterLink :to="{name: 'equipe'}" aria-label="Retornar">
                <Icon icon="icon-park-outline:return"/>
            </RouterLink>
        </div>
        <ShowProfile 
            :key="equipeStore.funcionarioSelecionado?.id"
            :id="equipeStore.funcionarioSelecionado?.id"
            :src="imgAvatar" 
            :name="equipeStore.funcionarioSelecionado?.nome_completo" 
             
            :tel="equipeStore.funcionarioSelecionado?.telefone" 
            :email="equipeStore.funcionarioSelecionado?.email" 
            :active="equipeStore.funcionarioSelecionado?.ativo"
            :categorias="equipeStore.funcionarioSelecionado?.categorias">
        </ShowProfile>
        <div class="box box-calendario">
            <div class="top">
                <h2 class="h2">Agenda</h2>
                <RouterLink :to="{name: 'agendamentos'}" href="">Ver calendário</RouterLink>
            </div>
            <!-- <CarouselDays></CarouselDays> -->
            <ul class="calendario-list scroll">
                <NextAppointments v-for="agendamento in agendamentosFiltrados"
                    :id="id"
                    :key="agendamento.id"
                    :src="imgAvatar" 
                    :name="auth.isPeloMenosFuncionario ? agendamento.cliente : agendamento.funcionario" 
                    :role="agendamento.servico" 
                    :hour="` ${agendamento.data} | ${agendamento.horario}`" 
                    :status="agendamento.status">
                </NextAppointments>
                <p v-if="agendamentosFiltrados.length === 0 && !agendamentosStore.loading" class="alert">
                    Nenhum agendamento futuro para este funcionário.
                </p>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    .container-profile{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;
        font-size: 14px;
        
        .wrapper-name{
            @include flex(row, space-between, center);
            width: 100%;
    
            .names{
                @include flex(row, space-between, center);
                gap: 16px;
            }
        }
    
        .box-calendario{
            width: 100%;
            @include flex(column, space-between, center);
            gap: 32px;
            
            .top{
                @include flex(row, space-between, center);
                width: 100%;
            }

            .calendario-list{
                @include flex(column, start, start);
                gap: 32px;
                width: 100%;
                max-height: 512px;
                overflow-y: auto;
                padding-right: 16px;
            }
        }
    
        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;

            .wrapper-name{
                width: calc(100vw - 256px - 16px);
                padding-right: 32px;
            }
        }
    }
</style>