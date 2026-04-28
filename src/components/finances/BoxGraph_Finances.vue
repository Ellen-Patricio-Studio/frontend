<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import LineGraph from './LineGraph.vue';
import BarGraph from '@/components/graph/BarGraph.vue';
import { useFinanceiroStore } from '@/stores/useFinanceiroStore';
import { useAuthStore } from '@/stores/useAuthStore';

const auth = useAuthStore();
const financeiroStore = useFinanceiroStore();

// ─── SELECT ──────────────────────────────────────────────────────────────────
const opcoes = [
  { value: 'periodo',    label: 'Receitas - Despesas'         },
  { value: 'pagamento',  label: 'Receita por forma de pagamento' },
  { value: 'servico',    label: 'Receita por serviço'         },
];

const opcaoSelecionada = ref('periodo');

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const MESES_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

/**
 * Agrega um array de { data: 'dd/mm/yyyy', valor: number }
 * somando por mês. Retorna Map<'MM/YYYY', number>.
 */
function agregarPorMes(itens = []) {
  const map = new Map();
  itens.forEach(({ data, valor }) => {
    if (!data) return;
    const [, mes, ano] = data.split('/');
    const chave = `${mes}/${ano}`;
    map.set(chave, (map.get(chave) ?? 0) + valor);
  });
  return map;
}

/**
 * Gera labels e valores ordenados a partir de um Map<'MM/YYYY', number>.
 * Converte "05/2025" → "Mai"
 */
function mapParaSerie(map) {
  const entradas = [...map.entries()].sort((a, b) => {
    const [ma, aa] = a[0].split('/').map(Number);
    const [mb, ab] = b[0].split('/').map(Number);
    return aa !== ab ? aa - ab : ma - mb;
  });
  return {
    labels: entradas.map(([chave]) => {
      const [mes] = chave.split('/').map(Number);
      return MESES_PT[mes - 1];
    }),
    dados: entradas.map(([, v]) => v),
  };
}

// ─── FORMAS DE PAGAMENTO ─────────────────────────────────────────────────────
const FORMA_PT = {
  PIX:            'Pix',
  DINHEIRO:       'Dinheiro',
  CARTAO_CREDITO: 'Crédito',
  CARTAO_DEBITO:  'Débito',
};

// ─── COMPUTED CENTRAL ────────────────────────────────────────────────────────
const grafico = computed(() => {
  const df = financeiroStore.dashboardFinanceiro;

  if (!df) return { tipo: 'line', labels: [], receitas: [], despesas: [], barDados: [], titulo: '' };

  switch (opcaoSelecionada.value) {

    case 'periodo': {
      // Receitas: agrega receita_por_periodo por mês
      const receitaMap = agregarPorMes(df.receita_por_periodo ?? []);
      const { labels, dados: receitas } = mapParaSerie(receitaMap);

      // Despesas: a API não retorna série temporal de despesas.
      // Usamos os labels de receita e deixamos a série vazia para não
      // inventar dados — quando a API evoluir, basta mapear aqui.
      const despesas = labels.map(() => 0);

      return { tipo: 'line', labels, receitas, despesas, titulo: 'Receitas - Despesas' };
    }

    case 'pagamento': {
      const items = df.receita_por_pagamento ?? [];
      return {
        tipo:     'bar',
        labels:   items.map(r => FORMA_PT[r.forma] ?? r.forma),
        barDados: items.map(r => r.valor),
        unidade:  'R$',
        titulo:   'Receita por forma de pagamento',
      };
    }

    case 'servico': {
      const items = df.receita_por_servico ?? [];
      return {
        tipo:     'bar',
        labels:   items.map(r => r.servico),
        barDados: items.map(r => r.valor),
        unidade:  'R$',
        titulo:   'Receita por serviço',
      };
    }

    default:
      return { tipo: 'line', labels: [], receitas: [], despesas: [], barDados: [], titulo: '' };
  }
});

const titulo    = computed(() => grafico.value.titulo);
const temDados  = computed(() => grafico.value.labels?.length > 0);
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

    <template v-if="temDados">
      <!-- Gráfico de linha: Receitas x Despesas por período -->
      <LineGraph
        v-if="grafico.tipo === 'line'"
        :labels="grafico.labels"
        :receitas="grafico.receitas"
        :despesas="grafico.despesas"
      />

      <!-- Gráfico de barras: por pagamento ou serviço -->
      <BarGraph
        v-else-if="grafico.tipo === 'bar'"
        :labels="grafico.labels"
        :dados="grafico.barDados"
        :unidade="grafico.unidade"
      />
    </template>

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