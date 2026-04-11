<script setup>
import { Icon } from '@iconify/vue';
import ShowProfile from '@/components/profiles/ShowProfile.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import CarouselDays from '@/components/appointments/CarouselDays.vue';
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
import NextAppointments from '@/components/appointments/NextAppointments.vue';

</script>

<template>
    <div class="container-profile">
        <div class="wrapper-name h1-top">
            <div class="names">
                <p>Equipe</p>
                <p>></p>
                <p>Ellen patricio</p>
            </div>
            <Icon icon="icon-park-outline:return"/>
        </div>
        <ShowProfile :src="imgAvatar" name="Ellen Patricio" role="Estilista" ></ShowProfile>
        <div class="box box-calendario">
            <div class="top">
                <h2 class="h2">Agenda</h2>
                <a href="">Ver calendário</a>
            </div>
            <CarouselDays></CarouselDays>
            <ul class="calendario-list">
                <NextAppointments :src="imgAvatar" name="Julia campos" role="Pintura" date="1" hour="16:00 - 17:00" status="Confirmado"></NextAppointments>
                <NextAppointments :src="imgAvatar" name="Julia campos" role="Pintura" date="1" hour="16:00 - 17:00" status="Confirmado"></NextAppointments>
                <NextAppointments :src="imgAvatar" name="Julia campos" role="Pintura" date="1" hour="16:00 - 17:00" status="Confirmado"></NextAppointments>
                <NextAppointments :src="imgAvatar" name="Julia campos" role="Pintura" date="1" hour="16:00 - 17:00" status="Confirmado"></NextAppointments>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    .container-profile{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;
        font-size: 14px;
        
        .wrapper-name{
            @include flex(row, space-between, center);
            width: 100%;
    
            .names{
                @include flex(row, space-between, center);
                gap: 16px;
            }
        }
    
        .box-calendario{
            width: 100%;
            @include flex(column, space-between, center);
            gap: 32px;
            
            .top{
                @include flex(row, space-between, center);
                width: 100%;
            }

            .calendario-list{
                @include flex(column, start, start);
                gap: 32px;
                width: 100%;
            }
        }
    
        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);
            margin-bottom: 16px;

            .wrapper-name{
                width: calc(100vw - 256px - 16px);
                padding-right: 32px;
            }
        }
    }
</style>