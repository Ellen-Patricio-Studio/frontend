<script setup>
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import BoxInfo from '@/components/BoxInfo.vue';
import BoxGraph from '@/components/graph/BoxGraph.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useBreakpoints } from '@/composables/useBreakpoints';
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
const { width } = useBreakpoints();
import { onMounted } from 'vue';
import { useAgendaStore } from '@/stores/useAgendaStore';
import { useAuthStore } from '@/stores/useAuthStore';

const agendamentos = useAgendaStore()
const auth = useAuthStore()

onMounted(() => {
    agendamentos.carregarAgendamentos();
})

// const filtrarPage = () => {
//     agendamentos.carregarAgendamentos(1)
// }

</script>

<template>
    <div class="dash-container">
        <div class="h1 h1-top">Overview</div>
        <div class="boxes">
            <BoxInfo v-if="isPeloMenosFuncionario" icon="solar:calendar-bold" texto="Agendamentos hoje" numero="123" background-color="--azul-claro-box" icon-color="--azul-escuro-box"      ></BoxInfo>
            <BoxInfo v-if="isPeloMenosFuncionario" icon="boxicons:dollar" texto="Receita de hoje" numero="123" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"    ></BoxInfo>
            <BoxInfo v-if="isPeloMenosFuncionario" icon="fluent:people-team-24-filled" texto="Novos clientes" numero="123" background-color="--roxo-claro-box" icon-color="--roxo-escuro-box"></BoxInfo>
        </div>
        <BoxGraph graph-type="bar"></BoxGraph>
        <ul class="appointments-list box">
           <div class="top">
               <h2 class="h2">Próximos agendamentos</h2>
               <RouterLink :to="{name: 'agendamentos'}" href="#">Ver todos</RouterLink>
           </div>
           <NextAppointments v-for="item in agendamentos.agendamentos" :key="item.id" :src="imgAvatar" alt="Foto de perfil" :name="item.funcionario" role="Hidratação" hour="17:30 - 18:30" status="Pendente"></NextAppointments>
           
        </ul>
        <ul class="box-lists box recent-appointments" v-if="width >= 768">
            <div class="top">
                <h2 class="h2">Agendamentos recentes</h2>
                <input type="search" name="" id="input-search" placeholder="Buscar.." class="input">
            </div>
            <div class="titles">
                <p>Cliente</p>
                <p>Serviço</p>
                <p>Funcionário</p>
                <p>Data</p>
                <p>Valor</p>
                <p>Status</p>
                <p>Ação</p>
            </div>
            <RecentAppointmentsList
                :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio"  service="Manicure" 
                worker="Julia Almeida" date="Hoje, 10:30" value="R$100,00" status="Confirmado" 
            ></RecentAppointmentsList>
            
            <RecentAppointmentsList
                :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio"  service="Manicure" 
                worker="Julia Almeida" date="Hoje, 10:30" value="R$100,00" status="Confirmado" 
            ></RecentAppointmentsList>

            <RecentAppointmentsList
                :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio"  service="Manicure" 
                worker="Julia Almeida" date="Hoje, 10:30" value="R$100,00" status="Confirmado" 
            ></RecentAppointmentsList>

        </ul>
        <RouterLink :to="{name: 'novo-agendamento'}" class="button-rosa btn-dash">+ Novo agendamento</RouterLink>
    </div>
</template>

<style lang="scss">
    .dash-container{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;

        .appointments-list{
            width: 100%;
            @include flex(column, center, center);
            gap: 32px;
            padding-top: 24px;

            .top{
                @include flex(row, space-between, center);
                width: 100%;
                margin-bottom: 16px;

                a{
                    color: #3fa5d4;
                    font-size: 14px;
                }
            }
        }
    }

    @media all and (min-width: 768px){
        .dash-container{
            padding-left: calc(256px + 32px);
            flex-wrap: wrap;
            flex-direction: row;
            align-items: stretch;
            margin-bottom: 16px;

            .appointments-list{
                flex: 1;
                justify-content: start;
                min-width: 300px;
                
            }

            

            .btn-dash{
                background-color: yellow;
                width: 224px;
                height: 38px;
                position: absolute;
                top: 16px;
                right: 28px;
            }
        }
    }
</style>
