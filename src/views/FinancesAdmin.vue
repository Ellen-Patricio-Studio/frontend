<script setup>
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import BoxInfo from '@/components/BoxInfo.vue';
import BoxGraph from '@/components/graph/BoxGraph.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useBreakpoints } from '@/composables/useBreakpoints';
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
import RecentsTransitionList from '@/components/finances/RecentsTransitionList.vue';
import { useFinanceiroStore } from '@/stores/useFinanceiroStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';
import BoxGraph_Finances from '@/components/finances/BoxGraph_Finances.vue';

const auth = useAuthStore()
const financeiroStore = useFinanceiroStore()
const { width } = useBreakpoints()

onMounted(() => {
    if (auth.isAdmin) {
        financeiroStore.fetchLancamentos({page: 1});
        financeiroStore.fetchDashboardFinanceiro();
    }
});

</script>

<template>
    <div class="finances-container-admin">
        <div class="h1 h1-top">Finanças</div>
        <div class="boxes">
            <BoxInfo icon="boxicons:dollar" texto="Receitas" :numero="financeiroStore.dashboardFinanceiro?.receita_total || 'R$ 0,00'" background-color="--verde-claro-box" icon-color="--verde-escuro-box"></BoxInfo>
            <BoxInfo icon="mdi:account-off" texto="Taxa no-show" :numero="financeiroStore.dashboardFinanceiro?.taxa_no_show || 'R$ 0,00'" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"></BoxInfo>
            <BoxInfo icon="mdi:chart-line" texto="Ticket médio" :numero="financeiroStore.dashboardFinanceiro?.ticket_medio || 'R$ 0,00'" background-color="--roxo-claro-box" icon-color="--roxo-escuro-box"></BoxInfo>
        </div>
        <BoxGraph_Finances></BoxGraph_Finances>
        <ul class="box-lists box recent-transitions-list">
            <div class="top">
                <h2 class="h2">Transações recentes</h2>
                <input type="text" class="input" placeholder="Buscar...">
            </div>
            <div class="titles">
                <p>Nº</p>
                <p>Data criação</p>
                <p>Descrição</p>
                <p>Nº agendamento</p>
                <p>Valor</p>
                <p>Operação</p>
                <p>Status</p>
                <p>Data pagamento</p>
                <p>Opções</p>
            </div>
            <RecentsTransitionList v-for="transacao in financeiroStore.lancamentos" :transacao="transacao"></RecentsTransitionList>
        </ul>
    </div>
</template>

<style lang="scss">
    .finances-container-admin{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;
        }
    }
</style>
