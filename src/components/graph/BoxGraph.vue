<script setup>
import BoxInfo from '@/components/BoxInfo.vue';
import BarGraph from './BarGraph.vue';
defineProps({
    graphType: String,
    agendamentos: Array
})

</script>

<template>
    <div class="box-graph box">
        <div class="top">
            <h2 class="h2" v-if="graphType === 'bar'">Total de agendamentos</h2>
            <h2 class="h2" v-else="graphType">Receitas x Despesas</h2>
            <select id="options" class="button-select">
                <option value="Semanal">Semanal</option>
                <option value="Mensal">Mensal</option>
                <option value="Anual">Anual</option>
            </select>
        </div>
        <BarGraph :graphType="graphType"></BarGraph>
    </div>
</template>

<style lang="scss">
    .box-graph{
        @include flex(column, start, start);
        width: 100%;
        flex: 1;
        padding-top: 24px !important;
        gap: 32px;

        .top{
            @include flex(row, space-between, center);
            width: 100%;
        }

        @media all and (min-width: 768px){
            max-width: calc((100vw - 256px - 32px - 24px));
        }
    }
</style>
