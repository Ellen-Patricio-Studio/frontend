<script setup>
import { computed, onMounted, ref } from 'vue';
import BarGraph from './BarGraph.vue';
import { useFinanceiroStore } from '@/stores/useFinanceiroStore';
import { useAuthStore } from '@/stores/useAuthStore';

const auth = useAuthStore();
const financeiroStore = useFinanceiroStore();

onMounted(() => {
  if (auth.isAdmin) {
    financeiroStore.fetchDashboardOperacional();
  }
});

// ─── OPÇÕES DO SELECT ────────────────────────────────────────────────────────
const opcoes = [
  { value: 'status',    label: 'Total de agendamentos'       },
  { value: 'servicos',  label: 'Serviços mais realizados'    },
  { value: 'duracao',   label: 'Serviços com maior duração'  },
  { value: 'dias',      label: 'Dias de maior demanda'       },
  { value: 'horarios',  label: 'Horários de maior demanda'   },
];

const opcaoSelecionada = ref('status');

// ─── CONSTANTES DE DIAS ──────────────────────────────────────────────────────
const DIAS_ORDEM = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DIAS_PT    = { Sunday:'Dom', Monday:'Seg', Tuesday:'Ter', Wednesday:'Qua', Thursday:'Qui', Friday:'Sex', Saturday:'Sáb' };

// ─── COMPUTED POR TIPO ───────────────────────────────────────────────────────
const dadosPorTipo = computed(() => {
  const op = financeiroStore.dashboardOperacional;
  if (!op) return { labels: [], dados: [], unidade: '' };

  switch (opcaoSelecionada.value) {

    case 'status': {
      // { AGENDADO: 10, REALIZADO: 50, CANCELADO: 5, ... }
      const STATUS_PT = {
        AGENDADO:   'Agendado',
        CONFIRMADO: 'Confirmado',
        REALIZADO:  'Realizado',
        CANCELADO:  'Cancelado',
        AUSENTE:    'Ausente',
      };
      const entries = Object.entries(op.atendimentos_por_status ?? {});
      return {
        labels:   entries.map(([k]) => STATUS_PT[k] ?? k),
        dados:    entries.map(([, v]) => v),
        unidade:  'agendamentos',
        titulo:   'Total de agendamentos por status',
      };
    }

    case 'servicos': {
      // [{ servico: 'Corte', total: 120 }, ...]
      const items = op.servicos_mais_realizados ?? [];
      return {
        labels:  items.map(s => s.servico),
        dados:   items.map(s => s.total),
        unidade: 'realizações',
        titulo:  'Serviços mais realizados',
      };
    }

    case 'duracao': {
      // [{ servico: 'Relaxamento', duracao: 90 }, ...]
      const items = op.servicos_maior_duracao ?? [];
      return {
        labels:  items.map(s => s.servico),
        dados:   items.map(s => s.duracao),
        unidade: 'min',
        titulo:  'Serviços com maior duração',
      };
    }

    case 'dias': {
      // [{ dia: 'Monday', total: 300 }, ...] — ordena Dom→Sáb
      const raw = op.dias_maior_demanda ?? [];
      const ordenado = DIAS_ORDEM.map(dia => {
        const encontrado = raw.find(d => d.dia === dia);
        return { label: DIAS_PT[dia], total: encontrado?.total ?? 0 };
      });
      return {
        labels:  ordenado.map(d => d.label),
        dados:   ordenado.map(d => d.total),
        unidade: 'agendamentos',
        titulo:  'Dias de maior demanda',
      };
    }

    case 'horarios': {
      // [{ horario: '09:00', total: 80 }, ...]
      const items = op.horarios_maior_demanda ?? [];
      return {
        labels:  items.map(h => h.horario),
        dados:   items.map(h => h.total),
        unidade: 'agendamentos',
        titulo:  'Horários de maior demanda',
      };
    }

    default:
      return { labels: [], dados: [], unidade: '', titulo: '' };
  }
});

const titulo  = computed(() => dadosPorTipo.value.titulo);
const labels  = computed(() => dadosPorTipo.value.labels);
const dados   = computed(() => dadosPorTipo.value.dados);
const unidade = computed(() => dadosPorTipo.value.unidade);
</script>

<template>
  <div class="box-graph box">
    <div class="top">
      <h2 class="h2">{{ titulo }}</h2>
      <select v-model="opcaoSelecionada" id="options" class="button-select">
        <option v-for="op in opcoes" :key="op.value" :value="op.value">
          {{ op.label }}
        </option>
      </select>
    </div>

    <BarGraph
      v-if="labels.length"
      :labels="labels"
      :dados="dados"
      :unidade="unidade"
    />
    <p v-else class="sem-dados">Carregando dados...</p>
  </div>
</template>

<style lang="scss">
.box-graph {
  @include flex(column, start, start);
  width: 100%;
  flex: 1;
  padding-top: 24px !important;
  gap: 32px;

  .top {
    @include flex(row, space-between, center);
    width: 100%;
    
    .h2{
      @media all and (max-width: 768px){
        width: 100%;
        flex: 2;
      }
    }
  
    select{
      @media all and (max-width: 768px){
        width: 100%;
        flex: 1;

      }
    }
  }

  .sem-dados {
    color: var(--texto-secundario, #888);
    font-size: 14px;
  }

  @media all and (min-width: 768px) {
    max-width: calc((100vw - 256px - 32px - 24px));
  }
}
</style>