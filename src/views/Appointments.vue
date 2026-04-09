<script setup>
import AppointmentsList from '@/components/appointments/AppointmentsList.vue';
import CarouselDays from '@/components/appointments/CarouselDays.vue';
import MobileCalendar from '@/components/appointments/MobileCalendar.vue';
import imgAvatar from '@/assets/images/logo.jpeg'

</script>

<template>
    <div class="appointment-container">
        <h1 class="h1 h1-top">Agendamentos</h1>
        <div class="appointment-content">
            <div class="appointment-calendar box">
                <CarouselDays></CarouselDays>
                <MobileCalendar></MobileCalendar>
    
            </div>
            <ul class="appointments-box box">
                <div class="top">
                    <h2 class="h2">Lista de agendamentos</h2>
                    <input type="text" placeholder="Buscar..." class="input">
                    <div class="selects">
                        <select name="" id="" class="button-select">
                            <option value="funcionario">Funcionário</option>
                        </select>
                        <select name="" id="" class="button-select">
                            <option value="status">Status</option>
                        </select>
                    </div>
                </div>
                <AppointmentsList :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio" professional="Arlindo Guimarães" status="Pendente" role="Corte de unha"></AppointmentsList>
                <AppointmentsList :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio" professional="Arlindo Guimarães" status="Pendente" role="Corte de unha"></AppointmentsList>
                <AppointmentsList :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio" professional="Arlindo Guimarães" status="Pendente" role="Corte de unha"></AppointmentsList>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    .appointment-container{
        margin-top: 120px;
        padding: 16px 24px;
        @include flex(column, center, center);
        gap: 32px;
        width: 100%;
        overflow: hidden;
        margin: calc(80px + 16px) 0;


        .appointment-content{
            @include flex(column, center, center);
            gap: 32px;
            width: 100%;
            max-width: 100%;
            height: auto;
        }
        
        .appointment-calendar{
            width: 100%;
        }

        .appointments-box{
            @include flex(column, center, center);
            gap: 16px;
            width: 100%;
            padding-top: 24px;

            .top{
                width: 100%;
                @include flex(column, center, start);
                gap: 16px;

                .input{
                    width: 100%;
                }

                .selects{
                    width: 100%;
                    @include flex(row, space-between, center);
                    gap: 16px;

                    select{
                        width: 100%;
                        flex: 1;
                    }
                }
            }
        }

        @media all and (min-width: 768px){  
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;
            

            .appointment-content{
                flex-direction: row;
                align-items: stretch;
                flex-wrap: wrap;
            }

            .appointment-calendar{
                flex: 2;
                min-width: 400px;
            }
            
            .appointments-box{
                flex: 1;
                min-width: 300px;
                justify-content: start;

                
            }

        }
    }
</style>
