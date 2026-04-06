<script setup>
import { Bar } from 'vue-chartjs'
import { 
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, 
  CategoryScale, LinearScale 
} from 'chart.js'

// Registro obrigatório dos módulos do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  datasets: [
    {
      label: 'Agendamentos',
      backgroundColor: [
        '#C22E7C', // Rosa
        '#9D2CFF', // Roxo
        '#C22E7C', 
        '#9D2CFF', 
        '#C22E7C', 
        '#9D2CFF', 
        '#C22E7C'
      ],
      borderRadius: 8,
      data: [2100, 2800, 2300, 3200, 2900, 3800, 2500]
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false // Esconde a legenda para ficar igual à foto
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        drawBorder: false,
        color: '#f0f0f0' // Linhas de fundo bem sutis
      },
      ticks: {
        stepSize: 1000 // Escala de 1000 em 1000
      }
    },
    x: {
      grid: {
        display: false // Remove linhas verticais para limpar o visual
      }
    }
  }
}


</script>

<template>
    <div class="chart-container">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<style lang="scss">
    .chart-container {
      height: 300px; // Controle a altura por aqui
      width: 100%;
      max-width: 600px;
      background-color: transparent;
      padding: 16px;
    }
</style>
