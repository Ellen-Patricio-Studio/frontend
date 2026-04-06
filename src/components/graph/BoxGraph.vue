<script setup>
import BoxInfo from '@/components/BoxInfo.vue';
import BarGraph from './BarGraph.vue';


</script>

<template>
    <div class="box-graph box">
        <div class="top">
            <h2 class="h2">Total de agendamentos</h2>
            <select id="options" class="button-select">
                <option value="Semanal">Semanal</option>
                <option value="Mensal">Mensal</option>
                <option value="Anual">Anual</option>
            </select>
        </div>
        <BarGraph></BarGraph>
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
