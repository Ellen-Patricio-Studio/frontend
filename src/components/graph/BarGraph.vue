<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  labels:  { type: Array,  default: () => [] },
  dados:   { type: Array,  default: () => [] },
  unidade: { type: String, default: '' }
});

const COLORS = { pink: '#D63384', purple: '#8B2BE2' };

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{
    data: props.dados,
    backgroundColor: props.dados.map((_, i) => i % 2 === 0 ? COLORS.pink : COLORS.purple),
    borderRadius: 4,
    borderSkipped: false,
    barPercentage: 0.6,
    categoryPercentage: 0.7
  }]
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.parsed.y} ${props.unidade}`
      }
    }
  },
  scales: {
    x: {
      grid:   { display: false },
      border: { display: false },
      ticks:  { color: '#888' }
    },
    y: {
      grid:   { color: 'rgba(200,200,200,0.15)' },
      border: { display: false, dash: [4, 4] },
      ticks:  { 
        color: '#888',
        // Define o intervalo entre os números. 
        // Se for agendamentos/realizações, pula de 1 em 1.
        // Se for 'min', deixa o Chart.js calcular automaticamente (undefined).
        stepSize: props.unidade !== 'min' ? 1 : undefined,
        // Garante que não renderize rótulos decimais caso o stepSize falhe
        callback: function(value) {
          if (props.unidade !== 'min') {
            return Math.floor(value) === value ? value : null;
          }
          return value;
        }
      },
      beginAtZero: true
    }
  }
}));
</script>

<template>
  <div class="bar-graph-wrapper">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.bar-graph-wrapper {
  width: 100%;
  height: 280px;
}
</style>