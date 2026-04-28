<script setup>
import { computed } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement,
  LineElement, CategoryScale, LinearScale, Filler
} from 'chart.js'
import { useFinanceiroStore } from '@/stores/useFinanceiroStore'

const financeiroStore = useFinanceiroStore()
const props = defineProps({
  graphType: {
    type: String,
    default: 'bar'
  }
})

ChartJS.register(
  Title, Tooltip, Legend, BarElement, PointElement, 
  LineElement, CategoryScale, LinearScale, Filler
)

// --- LÓGICA DO GRÁFICO DE BARRAS (OPERACIONAL) ---
const barData = computed(() => {
  // Pegamos os dados do store. Se não houver, usamos arrays vazios.
  const stats = financeiroStore.dashboardOperacional?.atendimentos_por_status || {}
  
  // Transformamos as chaves do objeto em Labels (ex: ["REALIZADO", "CANCELADO"])
  const labels = Object.keys(stats)
  // Transformamos os valores em Data (ex: [10, 2])
  const data = Object.values(stats)

  return {
    labels: labels.length > 0 ? labels : ['Sem dados'],
    datasets: [{
      label: 'Total de Atendimentos',
      backgroundColor: labels.map((_, index) => index % 2 === 0 ? '#C22E7C' : '#9D2CFF'),
      borderRadius: 8,
      data: data.length > 0 ? data : [0]
    }]
  }
})

// --- LÓGICA DO GRÁFICO DE LINHAS (FINANCEIRO) ---
const lineData = computed(() => {
  const stats = financeiroStore.dashboardFinanceiro?.receita_por_periodo || []
  
  // Mapeia os dados que vêm da API: { data: "25/04/2026", valor: 150.0 }
  const labels = stats.map(item => item.data)
  const data = stats.map(item => item.valor)

  return {
    labels: labels.length > 0 ? labels : ['Sem dados'],
    datasets: [
      {
        label: 'Faturamento Diário',
        borderColor: '#9D2CFF',
        backgroundColor: 'rgba(157, 44, 255, 0.1)', // Um leve preenchimento fica elegante
        data: data,
        tension: 0.4, // Curvatura suave
        pointRadius: 4,
        fill: true,
        borderWidth: 3
      }
    ]
  }
})

// --- OPÇÕES DO GRÁFICO ---
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: { usePointStyle: true, boxWidth: 10 }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: '#f0f0f0', drawBorder: false },
      ticks: {
        // Se for financeiro, adiciona o prefixo R$
        callback: (value) => props.graphType === 'line' ? `R$ ${value}` : value
      }
    },
    x: { grid: { display: false } }
  }
}))
</script>

<template>
  <div class="chart-container">
    <Bar v-if="graphType === 'bar'" :data="barData" :options="chartOptions" />
    <Line v-else-if="graphType === 'line'" :data="lineData" :options="chartOptions" />
  </div>
</template>

<!-- <script setup>
import { computed } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement,
  LineElement, CategoryScale, LinearScale, Filler
} from 'chart.js'
import { useFinanceiroStore } from '@/stores/useFinanceiroStore'

const financeiroStore = useFinanceiroStore()
const props = defineProps({
  // 'bar' para barras (Agendamentos) ou 'line' para linhas (Financeiro)
  graphType: {
    type: String,
    default: 'bar'
  }
})

// Registro de todos os módulos necessários (incluindo Point, Line e Filler para o gráfico de linhas)
ChartJS.register(
  Title, Tooltip, Legend, BarElement, PointElement, 
  LineElement, CategoryScale, LinearScale, Filler
)

// --- Dados do Gráfico de Barras (Semanal) ---
const barData = {
  labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  datasets: [{
    label: 'Agendamentos',
    backgroundColor: ['#C22E7C', '#9D2CFF', '#C22E7C', '#9D2CFF', '#C22E7C', '#9D2CFF', '#C22E7C'],
    borderRadius: 8,
    data: [2100, 2800, 2300, 3200, 2900, 3800, 2500]
  }]
}

// --- Dados do Gráfico de Linhas (Mensal/Financeiro) ---
const lineData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  datasets: [
    {
      label: 'Receitas',
      borderColor: '#9D2CFF',
      backgroundColor: '#9D2CFF',
      data: [12000, 16000, 14000, 20500, 19000, 23500, 26000, 24500, 27500, 29000, 31000, 32500],
      tension: 0, // Curvatura da linha
      pointRadius: 0, // Esconde pontos para um visual limpo como na foto
      borderWidth: 3
    },
    {
      label: 'Despesas',
      borderColor: '#C22E7C',
      backgroundColor: '#C22E7C',
      data: [6000, 7500, 6500, 9000, 8000, 10500, 12000, 11000, 13000, 14000, 15000, 16000],
      tension: 0,
      pointRadius: 0,
      borderWidth: 3
    }
  ]
}

// --- Opções do Gráfico ---
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      // Exibe legenda apenas para o financeiro (linhas)
      display: props.graphType === 'line',
      position: 'top',
      align: 'end',
      labels: { 
        usePointStyle: true, 
        boxWidth: 10, 
        font: { size: 12 }, 
      },
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: '#f0f0f0', drawBorder: false },
      ticks: {
        // Adiciona o 'k' para valores financeiros se for mensal
        callback: (value) => props.graphType === 'monthly' ? `${value / 1000}k` : value
      }
    },
    x: { 
      grid: { display: false }, 
      ticks: {
        padding: 0,
      }
    }
  }
}))
</script>

<template>
  <div class="chart-container">
    <Bar v-if="graphType === 'bar'" :data="barData" :options="chartOptions" />
    <Line v-else-if="graphType === 'line'" :data="lineData" :options="chartOptions" />
  </div>
</template> -->

<style lang="scss" scoped>
.chart-container {
  height: 300px;
  width: 100%;
  background-color: transparent;
  padding: 8px;

}
</style>