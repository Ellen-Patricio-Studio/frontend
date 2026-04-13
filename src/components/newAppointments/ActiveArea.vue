<script setup>
    import { Icon } from '@iconify/vue';

    defineProps({
        activeService: Boolean,
        activeProfessional: Boolean,
        activeData: Boolean,
    })
</script>

<template>
            <div class="active-area">
                <div class="area">
                    <Icon icon="stash:circle-dot-duotone"  class="icon" :class="{'active': activeService}"/>
                    <p :class="{'active': activeService}">Serviços</p>
                </div>
                <hr>
                <div class="area">
                    <Icon icon="stash:circle-dot-duotone"  class="icon" :class="{'active': activeProfessional}"/>
                    <p :class="{'active': activeProfessional}">Profissional</p>
                </div>
                <hr>
                <div class="area">
                    <Icon icon="stash:circle-dot-duotone"  class="icon" :class="{'active': activeData}"/>
                    <p :class="{'active': activeData}">Data</p>
                </div>
            </div>
</template>

<style lang="scss">
.active-area{
    @include flex(row, space-between, center);
    width: 100%;
    color: var(--cinza-nav);
    gap: 16px;
    
    hr{
        flex: 2;
        border: 1px solid var(--cinza-claro);
    }
    
    .area{
        @include flex(row, start, center);
        gap: 8px;
        font-size: 14px;
        
        .icon{
            width: 24px;
            height: 24px;
            color: var(--cinza-nav);
        
            &.active{
                color: var(--rosa-nav);
            }
        }
        p{
            font-size: 14px;
            &.active{
                color: var(--rosa-nav);
            }
        }
    }

    @media all and (min-width: 768px){
        justify-content: center;

        hr{
            max-width: 100px;
        }
    }
}
</style>
