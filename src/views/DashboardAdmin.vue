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
import { useFinanceiroStore } from '@/stores/useFinanceiroStore';

const auth = useAuthStore()
const agendamentosStore = useAgendamentosStore();
const financeiroStore = useFinanceiroStore()

onMounted(() => {
    if(auth.isAdmin){
        agendamentosStore.fetchTodosAgendamentos()
        financeiroStore.fetchDashboardOperacional()
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
    // 1. Filtramos apenas os agendamentos com status relevante
    const futuros = agendamentosStore.agendamentos.filter(agendamento => 
        agendamento.status === 'AGENDADO' || agendamento.status === 'CONFIRMADO'
    );

    if (futuros.length === 0) return '--/--';

    // 2. Ordenamos para garantir que a data mais próxima venha primeiro
    const ordenados = [...futuros].sort((a, b) => {
        // Converte "dd/mm/yyyy" para um objeto Date comparável
        const converter = (dataStr) => {
            const [dia, mes, ano] = dataStr.split('/').map(Number);
            return new Date(ano, mes - 1, dia); // Meses no JS começam em 0
        };

        return converter(a.data) - converter(b.data);
    });

    // 3. Retorna a data do primeiro item (o mais próximo)
    return ordenados[0].data;
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

// ... outros imports
const buscaRecentes = ref(''); // Adicione esta linha

const historicoAgendamentos = computed(() => {
    return agendamentosStore.agendamentos.filter(a => 
        a.status === 'REALIZADO' || 
        a.status === 'AUSENTE' || 
        a.status === 'CANCELADO'
    );
});

const historicoFiltrado = computed(() => {
    const termo = buscaRecentes.value.toLowerCase();
    
    if (!termo) return historicoAgendamentos.value;

    return historicoAgendamentos.value.filter(a => {
        return (
            a.cliente?.toLowerCase().includes(termo) ||
            a.servico?.toLowerCase().includes(termo) ||
            a.funcionario?.toLowerCase().includes(termo) ||
            a.data?.includes(termo)
        );
    });
});

const historicoAgendamentosProximos = computed(() => {
    return agendamentosStore.agendamentos.filter(a => 
        a.status === 'AGENDADO' || 
        a.status === 'CONFIRMADO'
    );
})

const agendamentosHojeContagem = computed(() => {
    // 1. Pegamos a data de hoje no formato dd/mm/yyyy
    const hoje = new Date().toLocaleDateString('pt-BR');

    // 2. Filtramos a lista da store
    const filtrados = agendamentosStore.agendamentos.filter(agendamento => {
        // Verifica se a data é hoje
        const dataBate = agendamento.data === hoje;
        
        // Verifica se o status é um dos permitidos
        const statusValido = ['AGENDADO', 'CONFIRMADO'].includes(agendamento.status);
        
        return dataBate && statusValido;
    });

    return filtrados.length;
});

const receitaHoje = computed(() => {
    // 1. Pega a data de hoje no formato dd/mm/yyyy para bater com o backend
    const hoje = new Date().toLocaleDateString('pt-BR');

    // 2. Filtra os agendamentos de hoje que não foram cancelados
    const agendamentosHoje = agendamentosStore.agendamentos.filter(a => {
        const dataBate = a.data === hoje;
        // Consideramos CONFIRMADO (promessa de dinheiro) e REALIZADO (dinheiro em caixa)
        const statusValido = ['CONFIRMADO', 'REALIZADO', 'AGENDADO'].includes(a.status);
        return dataBate && statusValido;
    });

    // 3. Soma os valores
    const total = agendamentosHoje.reduce((acc, atual) => {
        // Remove "R$ ", troca a vírgula por ponto e converte para número
        const valorLimpo = atual.valor
            .replace('R$', '')
            .replace(/\./g, '') // Remove pontos de milhar, se houver
            .replace(',', '.')  // Troca vírgula decimal por ponto
            .trim();
        
        return acc + parseFloat(valorLimpo || 0);
    }, 0);

    // 4. Retorna formatado para exibir no BoxInfo
    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

</script>

<template>
    <div class="dash-container">
        <div class="h1 h1-top">Overview</div>
        <div class="boxes">
            <BoxInfo v-if="auth.isFuncionario && !auth.isAdmin" icon="ic:round-check" texto="Agendamentos completos" :numero="agendamentosCompletos" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"    ></BoxInfo>
            <BoxInfo v-if="auth.isPeloMenosFuncionario" icon="solar:calendar-bold" texto="Agendamentos hoje" :numero="agendamentosHojeContagem" background-color="--azul-claro-box" icon-color="--azul-escuro-box"      ></BoxInfo>
            <BoxInfo v-if="auth.isAdmin" icon="boxicons:dollar" texto="Receita de hoje" :numero="receitaHoje" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"    ></BoxInfo>
            <BoxInfo v-if="auth.isPeloMenosFuncionario" icon="fluent:people-team-24-filled" texto="Clientes" :numero="financeiroStore.dashboardOperacional?.card_clientes_ativos" background-color="--roxo-claro-box" icon-color="--roxo-escuro-box"></BoxInfo>
            
            <BoxInfo v-if="auth.isCliente" icon="solar:calendar-bold" texto="Próximo agendamento" :numero="proximoAgendamentoData" background-color="--azul-claro-box" icon-color="--azul-escuro-box"      ></BoxInfo>
            <BoxInfo v-if="auth.isCliente" icon="ic:round-check" texto="Agendamentos completos" :numero="agendamentosCompletos" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"    ></BoxInfo>
            <BoxInfo v-if="auth.isCliente" icon="uit:wallet" texto="Gasto total" :numero="gastoTotal" background-color="--roxo-claro-box" icon-color="--roxo-escuro-box"></BoxInfo>
            <!-- Ultima caixa a fazer -->

        </div>

        <BoxGraph v-if="auth.isAdmin"></BoxGraph> 
        
        <ul class="appointments-list box">
           <div class="top">
               <h2 class="h2">Próximos agendamentos</h2>
               <RouterLink :to="{name: 'agendamentos'}" href="#">Ver todos</RouterLink>
           </div>
           <NextAppointments 
                v-for="item in historicoAgendamentosProximos" 
                :key="item.id" 
                :src="imgAvatar" 
                :name="auth.isPeloMenosFuncionario ? item.cliente : item.funcionario" 
                :role="item.servico" 
                :hour="` ${item.data} | ${item.horario}`" 
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
                <input v-model="buscaRecentes" type="search" name="" id="input-search" placeholder="Buscar.." class="input">
            </div>
            <div class="titles">
                <p v-if="!auth.isCliente">Cliente</p>
                <p>Serviço</p>
                <p>Funcionário</p>
                <p>Data</p>
                <p>Valor</p>
                <p>Status</p>
                <!-- <p>Ação</p> -->
            </div>
            <RecentAppointmentsList
                v-for="item in historicoFiltrado"
                :key="item.id"
                :src="imgAvatar" 
                :name="item.cliente"
                :service="item.servico" 
                :worker="item.funcionario" 
                :date="item.data" 
                :value="item.valor" 
                :status="item.status"
            ></RecentAppointmentsList>
            <div v-if="historicoFiltrado.length === 0" style="padding: 20px; text-align: center;">
                Nenhum agendamento encontrado para "{{ buscaRecentes }}".
            </div>
        </ul>
        <RouterLink v-if="auth.isCliente" :to="{name: 'novo-agendamento'}" class="button-rosa btn-dash" aria-label="+ Novo agendamento">+ Novo agendamento</RouterLink>
    </div>
</template>

<style lang="scss">
    .dash-container{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;
        
        .recent-appointments{
            max-height: 512px;
            overflow-y: auto;
            padding-top: 24px;

            .titles, .item{
                min-width: 500px;
            }
        
            .top, .titles{
                @include flex(row, space-between, center);
                width: 100%;
                padding: 16px 0;
                position: sticky;
                top: -24px;
                background-color: var(--cards);
                z-index: 1; // evita itens passarem por cima ao scrollar
            }
        
            .titles{
                top: 52px;
            }
        }

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

            


        }
    }
</style>
