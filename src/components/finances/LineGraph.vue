<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Filler, Tooltip, Legend);

const props = defineProps({
  labels:   { type: Array,  default: () => [] },
  receitas: { type: Array,  default: () => [] },
  despesas: { type: Array,  default: () => [] },
});

const COLORS = {
  purple:      '#8B2BE2',
  purpleFill:  'rgba(139, 43, 226, 0.08)',
  pink:        '#D63384',
  pinkFill:    'rgba(214, 51, 132, 0.08)',
};

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Receitas',
      data: props.receitas,
      borderColor: COLORS.purple,
      backgroundColor: COLORS.purpleFill,
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: COLORS.purple,
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Despesas',
      data: props.despesas,
      borderColor: COLORS.pink,
      backgroundColor: COLORS.pinkFill,
      borderWidth: 2.5,
      pointRadius: 0,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: COLORS.pink,
      tension: 0.4,
      fill: true,
    },
  ],
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'start',
      labels: {
        color: '#888',
        boxWidth: 24,
        boxHeight: 2,
        padding: 16,
        usePointStyle: false,
        font: { size: 12 },
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.dataset.label}: R$ ${ctx.parsed.y.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      }
    }
  },
  scales: {
    x: {
      grid:   { display: false },
      border: { display: false },
      ticks:  { color: '#888', font: { size: 11 } },
    },
    y: {
      grid: {
        color: 'rgba(200, 200, 200, 0.15)',
        drawBorder: false,
      },
      border: { display: false, dash: [4, 4] },
      ticks: {
        color: '#888',
        font: { size: 11 },
        callback: (value) => {
          if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
          return value;
        },
      },
      beginAtZero: true,
    },
  },
}));
</script>

<template>
  <div class="line-graph-wrapper">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.line-graph-wrapper {
  width: 100%;
  height: 280px;
}
</style>