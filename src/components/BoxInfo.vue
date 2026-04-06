<script setup>
import { Icon } from '@iconify/vue';

defineProps({
    icon: String,
    texto: String,
    numero: String,
    iconColor: String,
    backgroundColor: String
})

    
</script>

<template>
    <div class="box-info box">
        <div class="icon-area" :style="{backgroundColor: `var(${backgroundColor})`}">
            <Icon :icon="icon" class="box-icon" :style="{color: `var(${iconColor})`}"/>
        </div>
        <p>{{ texto }}</p>
        <h2>{{ numero }}</h2>
    </div>
</template>

<style lang="scss">
    .box-info{
        @include flex(column, center, start);
        min-width: 163px;
        flex: 1;
        height: 144px;   
        gap: 12px;
        color: var(--cinza-nav);

        .icon-area{
            width: 32px;
            height: 32px;
            @include flex(row, center, center);
            border-radius: 8px;

            .box-icon{
                width: 20px;
                height: 20px;
            }
        }

        p{
            font-size: 14px;
        }

        h2{
            font-size: 24px;
        }
    }
</style>