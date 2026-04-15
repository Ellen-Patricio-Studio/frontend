<script setup>
import ButtonTime from '@/components/buttons/ButtonTime.vue';
import ActiveArea from '@/components/newAppointments/ActiveArea.vue';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import Information from '@/components/newAppointments/Information.vue';
import Avatar from '@/components/Avatar.vue';
import imgAvatar from '@/assets/images/logo.jpeg'





</script>

<template>
    <div class="container-DateSelection">
        <div class="box">
            <h1 class="h1 h1-top">Resumo</h1>
            <div class="proof">
                <div class="top">
                    <div class="back-icon">
                        <Icon class="icon" icon="streamline-ultimate:check-bold"/>
                    </div>
                    <h1>Reserva confirmada!</h1>
                    <p>Uma cópia deste comprovante foi enviada ao seu endereço de email.</p>
                    <div class="buttons">
                        <button class="button-select"><Icon icon="solar:calendar-broken" />Ver calendário</button>
                        <button class="button-select"><Icon icon="solar:calendar-broken" />Imprimir</button>
                    </div>
                </div>
                <div class="informations">
                    <div class="top">
                        <h2 class="h2">Detalhes <span>Confirmado</span></h2>
                        <p>Código de referência</p>
                        <hr>
                    </div>
                    <Information title="Serviço" description="Corte de cabelo + Cílios" subdescription="Duração: 90 minutos"></Information>
                    <Information title="Data" description="Segunda. 16 de março de 2026" subdescription="10:30"></Information>
                    <div class="information">
                        <p class="title">Profissional</p>
                        <Avatar :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio" role="Estilista"></Avatar>
                    </div>
                    <Information title="Local" description="Rua do salão" subdescription="123"></Information>
                </div>
                <hr>
                <div class="resume">
                    <h2 class="h2">Resumo financeiro</h2>
                    <p>Subtotal<span>R$350,00</span></p>
                    <p>Taxas e tarifas<span>R$30,00</span></p>
                    <p>Total pago<span class="total">R$380,00</span></p>
                </div>
                <div class="buttons">
                    <RouterLink class="button-rosa button-voltar">Cancelar reserva</RouterLink>
                    <RouterLink :to="{name: 'dashboard'}" class="button-rosa">Ir para o dashboard</RouterLink>
                </div>
            </div>   
            <div class="notice">

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
            padding: 32px;
            padding-top: 32px;
            padding-bottom: 32px;
            color: var(--cinza-nav);

            .proof{
                width: 100%;
                @include flex(column, center, start);
                gap: 32px;

                hr{
                    width: 100%;
                    border: 1px solid var(--cinza-claro);
                }

                .top{
                    @include flex(column, center, center);
                    gap: 16px;
                    text-align: center;
                    width: 100%;

                    .back-icon{
                        width: 64px;
                        height: 64px;
                        background-color: #DCFCE7;
                        padding: 18px;
                        border-radius: 999px;

                        .icon{
                            width: 100%;
                            height: 100%;
                            color: #16A34A;
                        }
                    }

                    .buttons{
                        @include flex(column, center, center);
                        gap: 8px;

                        .button-select{
                            @include flex(row, center, center);
                            gap: 8px;
                        }
                    }
                }

                .informations{
                    @include flex(column, center, start);
                    gap: 16px;
                    width: 100%;

                    .top{
                        @include flex(column, center, start);
                        gap: 8px;
                        width: 100%;                    

                        h2{
                            width: 100%;
                            @include flex(row, space-between, center);

                            span{
                                color: green;
                                font-size: 14px;
                            }
                        }
                    }
                }

                .resume{
                    @include flex(column, center, start);
                    width: 100%;
                    gap: 16px;

                    p{
                        @include flex(row, space-between, center);
                        width: 100%;

                        .total{
                            font-weight: 700;
                            font-size: 15px;
                            color: var(--rosa-nav)
                        }
                    }
                }

                .buttons{
                    @include flex(column, center, center);
                    width: 100%;
                    gap: 16px;
                }
            }
          
        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;
       
            .box{
                .proof{
                    .buttons{
                        flex-direction: row;
                    }
                }
            }
        }
    }
</style>