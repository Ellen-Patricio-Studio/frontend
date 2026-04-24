<script setup>
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import BoxInfo from '@/components/BoxInfo.vue';
import BoxGraph from '@/components/graph/BoxGraph.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useBreakpoints } from '@/composables/useBreakpoints';
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
const { width } = useBreakpoints();
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAgendamentosStore } from '@/stores/useAgendamentosStore';
import { computed } from 'vue';
import { ref } from 'vue';


const auth = useAuthStore()
const agendamentosStore = useAgendamentosStore();

onMounted(() => {
    if(auth.isAdmin){
        agendamentosStore.fetchTodosAgendamentos()
    } else {
        agendamentosStore.fetchMeusAgendamentos();
    }
})

// const filtrarPage = () => {
//     agendamentos.carregarAgendamentos(1)
// }

const agendamentosCompletos = computed(() => {
    return agendamentosStore.agendamentos.filter(agendamento => agendamento.status === 'REALIZADO').length;
});


const proximoAgendamentoData = computed(() => {
    const futuros = agendamentosStore.agendamentos.filter(agendamento => 
        agendamento.status === 'AGENDADO' || agendamento.status === 'CONFIRMADO'
    );
    
    return futuros.length > 0 ? futuros[0].data : '--/--';
});

const gastoTotal = computed(() => {
    const realizados = agendamentosStore.agendamentos.filter(a => a.status === 'REALIZADO');

    const total = realizados.reduce((acc, atual) => {
        const valorNumerico = parseFloat(
            atual.valor.replace('R$', '').replace('.', '').replace(',', '.').trim()
        );
        return acc + (valorNumerico || 0);
    }, 0);

    return total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
});

const historicoAgendamentos = computed(() => {
    return agendamentosStore.agendamentos.filter(a => 
        a.status === 'REALIZADO' || 
        a.status === 'AUSENTE' || 
        a.status === 'CANCELADO'
    );
});

</script>

<template>
    <div class="dash-container">
        <div class="h1 h1-top">Overview</div>
        <div class="boxes">
            <BoxInfo v-if="auth.isFuncionario && !auth.isAdmin" icon="ic:round-check" texto="Agendamentos completos" :numero="agendamentosCompletos" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"    ></BoxInfo>
            <BoxInfo v-if="auth.isPeloMenosFuncionario" icon="solar:calendar-bold" texto="Agendamentos hoje" numero="123" background-color="--azul-claro-box" icon-color="--azul-escuro-box"      ></BoxInfo>
            <BoxInfo v-if="auth.isAdmin" icon="boxicons:dollar" texto="Receita de hoje" numero="123" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"    ></BoxInfo>
            <BoxInfo v-if="auth.isPeloMenosFuncionario" icon="fluent:people-team-24-filled" texto="Novos clientes" numero="123" background-color="--roxo-claro-box" icon-color="--roxo-escuro-box"></BoxInfo>
            
            <BoxInfo v-if="auth.isCliente" icon="solar:calendar-bold" texto="Próximo agendamento" :numero="proximoAgendamentoData" background-color="--azul-claro-box" icon-color="--azul-escuro-box"      ></BoxInfo>
            <BoxInfo v-if="auth.isCliente" icon="ic:round-check" texto="Agendamentos completos" :numero="agendamentosCompletos" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"    ></BoxInfo>
            <BoxInfo v-if="auth.isCliente" icon="uit:wallet" texto="Gasto total" :numero="gastoTotal" background-color="--roxo-claro-box" icon-color="--roxo-escuro-box"></BoxInfo>
            <!-- Ultima caixa a fazer -->

        </div>
        <BoxGraph :agendamentos="agendamentosStore.agendamentos" v-if="auth.isAdmin" graph-type="bar"></BoxGraph>
        <ul class="appointments-list box">
           <div class="top">
               <h2 class="h2">Próximos agendamentos</h2>
               <RouterLink :to="{name: 'agendamentos'}" href="#">Ver todos</RouterLink>
           </div>
           <NextAppointments 
                v-for="item in agendamentosStore.agendamentos" 
                :key="item.id" 
                :src="imgAvatar" 
                :name="auth.isPeloMenosFuncionario ? item.cliente : item.funcionario" 
                :role="item.servico" 
                :hour="item.horario" 
                :status="item.status"
                @cancelar="handleCancelar(item.id)" 
            /> 
            <!-- 
                :name="auth.isPeloMenosFuncionario ? item.cliente : item.funcionario" : Se for cliente mostrará o nome 
                do funcionário, se for funcionário mostrará o nome do cliente.
            -->
        </ul>
        <ul class="box-lists box recent-appointments">
            <div class="top">
                <h2 class="h2">Agendamentos recentes</h2>
                <input type="search" name="" id="input-search" placeholder="Buscar.." class="input">
            </div>
            <div class="titles">
                <p v-if="!auth.isCliente">Cliente</p>
                <p>Serviço</p>
                <p>Funcionário</p>
                <p>Data</p>
                <p>Valor</p>
                <p>Status</p>
                <p>Ação</p>
            </div>
            <RecentAppointmentsList
                v-for="item in historicoAgendamentos"
                :key="item.id"
                :src="imgAvatar" 
                :name="item.cliente"
                :service="item.servico" 
                :worker="item.funcionario" 
                :date="item.data" 
                :value="item.valor" 
                :status="item.status"
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
            max-height: 412px;
            overflow-y: auto;
            position: relative;

            .top{
                @include flex(row, space-between, center);
                width: 100%;
                padding: 16px 0;
                position: sticky;
                top: -24px;
                background-color: var(--cards);

                a{
                    color: #3fa5d4;
                    font-size: 14px;
                }
            }

            &::-webkit-scrollbar {
                width: 8px; /* Largura da barra */
            }
            
            &::-webkit-scrollbar-track {
                background: transparent; /* Fundo da trilha transparente */
                margin: 8px 0; /* Adiciona um espaço no topo e base para não bater na curva */
            }
            
            &::-webkit-scrollbar-thumb {
                background-color: #888; /* Cor da barrinha */
                border-radius: 20px;    /* Arredonda a própria barrinha */
                border: 2px solid var(--cor-de-fundo); /* Cria um espaçamento visual */
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
