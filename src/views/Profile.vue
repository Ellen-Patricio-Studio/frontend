<script setup>
import { Icon } from '@iconify/vue';
import ShowProfile from '@/components/profiles/ShowProfile.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useEquipeStore } from '@/stores/useEquipeStore';

const route = useRoute()
const equipeStore = useEquipeStore()

onMounted(() => {
    const id = route.params.id
    equipeStore.buscarPorId(id)
})


</script>

<template>
    <p v-if="equipeStore.loading">Carregando perfil...</p>
    <div v-elif="equipeStore.funcionarioSelecionado" class="container-profile">
        <div class="wrapper-name h1-top">
            <div class="names">
                <p>Equipe</p>
                <p>></p>
                <p>{{equipeStore.funcionarioSelecionado?.nome_completo}}</p>
            </div>
            <RouterLink :to="{name: 'equipe'}">
                <Icon icon="icon-park-outline:return"/>
            </RouterLink>
        </div>
        <ShowProfile 
            :key="equipeStore.funcionarioSelecionado?.id"
            :id="equipeStore.funcionarioSelecionado?.id"
            :src="imgAvatar" 
            :name="equipeStore.funcionarioSelecionado?.nome_completo" 
            role="Estilista" 
            :tel="equipeStore.funcionarioSelecionado?.telefone" 
            :email="equipeStore.funcionarioSelecionado?.email" 
            :active="equipeStore.funcionarioSelecionado?.ativo"
            :categorias="equipeStore.funcionarioSelecionado?.categorias">
        </ShowProfile>
        <div class="box box-calendario">
            <div class="top">
                <h2 class="h2">Agenda</h2>
                <RouterLink :to="{name: 'agendamentos'}" href="">Ver calendário</RouterLink>
            </div>
            <!-- <CarouselDays></CarouselDays> -->
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