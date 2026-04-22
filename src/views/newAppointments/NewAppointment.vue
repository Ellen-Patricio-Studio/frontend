<script setup>
import ServiceItem from '@/components/newAppointments/ServiceItem.vue';
import { Icon } from '@iconify/vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
import ActiveArea from '@/components/newAppointments/ActiveArea.vue';
const { width } = useBreakpoints()


</script>

<template>
    <div class="container-newAppointment">
        <div class="box">
            <h1 class="h1 h1-top">Novo agendamento</h1>
            <ActiveArea :active-service=true />
            <div class="categories-wrapper">
                <h2 class="h2">Categorias</h2>
                <ul class="categories">
                    <li class="button-select categories-li active">Todos</li>
                    <li class="button-select categories-li">Unhas</li>
                    <li class="button-select categories-li">Estética</li>
                    <li class="button-select categories-li">Cabelo</li>
                </ul>
            </div>
            <ul class="new-appointment-list">
                <h2 class="h2">Escolher serviços</h2>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=true  id="1"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=false id="2"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=false id="3"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=true  id="4"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=true  id="4"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=true  id="4"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=true  id="4"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=true  id="4"></ServiceItem>
                <ServiceItem service="Corte de cabelo" description="Corte de cabelo" time="45 min" price="10" :checkStatus=true  id="4"></ServiceItem>
            </ul>
            <div class="confirmation">
                <div class="resume">
                    <p class="quantity-services">2 serviços selecionados</p>
                    <p v-if="width>=768" class="time">
                        <Icon icon="tabler:clock-filled" />
                        1 Hora
                    </p>
                    <p class="total-services">Total : R$120,00</p>
                </div>
                <div class="right">
                    <RouterLink :to="{name: 'selecionar-profissional'}" class="button-rosa">Prosseguir</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .container-newAppointment{
        padding: 16px 24px;
        margin: calc(80px + 16px) 0;
        transition: 1s;
        font-size: 14px;

        .box{
            width: 100%;
            @include flex(column, center, start);
            gap: 32px;
            padding-top: 32px;
            padding-bottom: 32px;

            .confirmation{
                .resume{
                    width: 100%;
                    @include flex(row, space-between, center);
                    color: var(--cinza-nav);
    
                    .total-services{
                        color: var(--rosa-nav);
                        font-weight: 700;
                    }
                }
            }

        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);

            .box{
                .confirmation{
                    .resume{
                        width: initial;
                        gap: 16px;

                        .time{
                            @include flex(row, start, center);
                            gap: 8px;
                        }
                    }

                }
            }

        }
    }
</style>