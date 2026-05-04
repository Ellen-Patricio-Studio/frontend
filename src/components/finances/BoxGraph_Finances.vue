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
  { value: 'periodo',    label: 'Evolução de receita'         },
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
/**
 * Agrega um array somando por mês. 
 * Garante que o valor seja tratado como número decimal.
 */
function agregarPorMes(itens = []) {
  const map = new Map();
  
  itens.forEach((item) => {
    if (!item.data || item.valor === undefined) return;

    const [, mes, ano] = item.data.split('/');
    const chave = `${mes}/${ano}`;

    let valorNumerico = 0;

    if (typeof item.valor === 'string') {
        // Verifica se a string usa vírgula (padrão BR) ou apenas ponto (padrão US)
        if (item.valor.includes(',')) {
            // Padrão BR: 1.200,50 -> 1200.50
            valorNumerico = parseFloat(item.valor.replace(/\./g, '').replace(',', '.'));
        } else {
            // Padrão US ou Limpo: 120.00 -> 120.00
            valorNumerico = parseFloat(item.valor);
        }
    } else {
        // Já é um Number
        valorNumerico = item.valor;
    }

    // Validação para evitar NaN (Not a Number) na soma
    if (isNaN(valorNumerico)) valorNumerico = 0;

    const atual = map.get(chave) ?? 0;
    map.set(chave, atual + valorNumerico);
  });
  
  return map;
}

/**
 * Gera labels e valores ordenados a partir de um Map<'MM/YYYY', number>.
 * Converte "05/2025" → "Mai"
 */
function mapParaSerie(map) {
  // 1. Ordena as entradas por data
  const entradas = [...map.entries()].sort((a, b) => {
    const [ma, aa] = a[0].split('/').map(Number);
    const [mb, ab] = b[0].split('/').map(Number);
    return aa !== ab ? aa - ab : ma - mb;
  });

  let totalAcumulado = 0; // Variável para guardar a soma progressiva

  return {
    labels: entradas.map(([chave]) => {
      const [mes] = chave.split('/').map(Number);
      return MESES_PT[mes - 1];
    }),
    dados: entradas.map(([, v]) => {
      totalAcumulado += v; // Soma o valor do mês atual ao que já tinha antes
      return totalAcumulado; // Retorna o acumulado para o gráfico
    }),
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
      console.log("Dados que o gráfico recebeu:", df.receita_por_periodo);
      // Receitas: agrega receita_por_periodo por mês
      const receitaMap = agregarPorMes(df.receita_por_periodo ?? []);
      const { labels, dados: receitas } = mapParaSerie(receitaMap);

      // Despesas: a API não retorna série temporal de despesas.
      // Usamos os labels de receita e deixamos a série vazia para não
      // inventar dados — quando a API evoluir, basta mapear aqui.
      const despesas = labels.map(() => 0);

      return { tipo: 'line', labels, receitas, despesas, titulo: 'Evolução de receita' };
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
        />
        <!-- :despesas="grafico.despesas" na linha de cima -->

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