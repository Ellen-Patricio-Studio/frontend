<script setup>
import { computed } from 'vue'
import { Bar, Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement,
  LineElement, CategoryScale, LinearScale, Filler
} from 'chart.js'

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
</template>

<style lang="scss" scoped>
.chart-container {
  height: 300px;
  width: 100%;
  background-color: transparent;
  padding: 8px;

}
</style>