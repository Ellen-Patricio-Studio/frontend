<script setup>
import ServiceItem from '@/components/newAppointments/ServiceItem.vue';
import { Icon } from '@iconify/vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
import ActiveArea from '@/components/newAppointments/ActiveArea.vue';
import ProfessionalItem from '@/components/newAppointments/ProfessionalItem.vue';
import Avatar from '@/components/Avatar.vue';
const { width } = useBreakpoints()
import imgAvatar from '@/assets/images/logo.jpeg';



</script>

<template>
    <div class="container-professionalSelection">
        <div class="box">
            <h1 class="h1 h1-top">Selecionar profissional</h1>
            <ActiveArea :activeProfessional=true ></ActiveArea>
            <ul class="new-appointment-list">
                <h2 class="h2">Escolher profissional</h2>
                <ProfessionalItem name="Qualquer profissional / Sem preferência" :checkStatus=false></ProfessionalItem>
                <ProfessionalItem name="Ellen Patricio" role="Estilista" :checkStatus=false></ProfessionalItem>
                <ProfessionalItem name="Ellen Patricio" role="Estilista" :checkStatus=false></ProfessionalItem>
                <ProfessionalItem name="Ellen Patricio" role="Estilista" :checkStatus=false></ProfessionalItem>
            </ul>
            <div class="confirmation">
                <div class="selection">
                    <p class="title">Selecionado</p>
                    <Avatar :src="imgAvatar" name="Qualquer profissional / Sem preferência"></Avatar>
                </div>
                <div class="right">
                    <button class="button-rosa button-voltar">Voltar</button>
                    <button class="button-rosa">Prosseguir</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .container-professionalSelection{
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
        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);

            .confirmation{

            }
        }
    }
</style>