<script setup>
import ButtonTime from '@/components/buttons/ButtonTime.vue';
import ActiveArea from '@/components/newAppointments/ActiveArea.vue';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const date = ref(new Date());

const attributes = ref([
    {
        key: 'today',
        highlight: {
            color: 'purple',
            fillMode: 'light'
        },
        dates: new Date(),
    },
    {
        dot: 'pink',
        dates: [
            new Date(2026, 3, 16)
        ]
    }
])




</script>

<template>
    <div class="container-DateSelection">
        <div class="box">
            <h1 class="h1 h1-top">Selecionar profissional</h1>
            <ActiveArea :activeData=true ></ActiveArea>
            <div class="content">
                <div class="dates">
                    <VDatePicker v-model="date" :attributes="attributes" transparent borderless trim-weeks title-position="left" expanded />
                </div>
                <div class="times">
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                    <ButtonTime time="08:00" :active=false ></ButtonTime>
                </div>
            </div>
            <div class="confirmation">
                <div class="finally-resume">
                    <p><Icon icon="fa7-solid:gears" class="icon"/>2 serviços incluido</p>
                    <p><Icon icon="clarity:employee-solid" class="icon"/>Ellen Patricio</p>
                    <p><Icon icon="solar:calendar-broken" class="icon"/>Seg, 16 de Mar - 10:30 </p>
                    <p class="total">R$380,00</p>
                </div>
                <div class="right">
                    <button class="button-rosa button-voltar">Voltar</button>
                    <button class="button-rosa">Agendar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .container-DateSelection{
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
                .selection{
                    @include flex(column, center, start);

                    .title{
                        font-size: 12px;
                        color: var(--cinza-nav);
                    }
                }
            }

            .content{
                width: 100%;
                @include flex(column, center, center);
                gap: 32px;
            }

            .dates{
                width: 100%;
            }

            .times{
                width: 100%;
                @include flex(row, center, start);
                flex-wrap: wrap;
                gap: 16px;
            }
           
        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);

            .box{
                .content{
                    flex-direction: row;
                    align-items: start;
                    justify-content: start;
                    
    
                    .dates{
                        flex: 1;
                        max-width: 450px;
                    }
    
                    .times {
                        flex: 1.5;
    
                    }
                }

            }
        }
    }
</style>