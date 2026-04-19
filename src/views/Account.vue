<script setup>
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import BoxInfo from '@/components/BoxInfo.vue';
import BoxGraph from '@/components/graph/BoxGraph.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useBreakpoints } from '@/composables/useBreakpoints';
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
import Avatar from '@/components/Avatar.vue';
const { width } = useBreakpoints()

</script>

<template>
    <div class="account-container">
        <div class="h1 h1-top">Minha conta</div>
        <div class="box profile-info">
            <Avatar :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio" role="Admin - Proprietária"></Avatar>
            <button class="button-select">Editar</button>
        </div>
        <ul class="box-lists box">
            <div class="top">
                <h2 class="h2">Dados pessoais</h2>
            </div>
            <div class="data-item">
                <p class="subtitle">Nome completo</p>
                <p class="data">Hellen Patricio</p>
            </div>
            <div class="data-item">
                <p class="subtitle">Email</p>
                <p class="data">hellen.patricio@eps.com.br</p>
            </div>
            <div class="data-item">
                <p class="subtitle">Telefone</p>
                <p class="data">(11) 12345-6789</p>
            </div>
            <div class="data-item">
                <p class="subtitle">Serviços</p>
                <p class="data">Corte de cabelo</p>
                <p class="data">Manicure</p>
                <p class="data">Pedicure</p>
            </div>
            <div class="data-item">
                <p class="subtitle">Função</p>
                <p class="data">Administradora - Proprietária</p>
            </div>
        </ul>
        <ul class="box-lists box">
            <div class="top">
                <h2 class="h2">Senha</h2>
                <button class="button-select">Editar</button>
            </div>
            <div class="data-item">
                <p class="subtitle">Status</p>
                <p class="data">Atualizada há dois meses</p>
            </div>
        </ul>
    </div>
</template>

<style lang="scss">
    .account-container{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;

        .profile-info{
            width: 100%;
            @include flex (row, space-between, center);
        }

        .data-item{
            width: 100%;
            font-size: 12px;

            .data{
                font-weight: bold;
            }
        }

    }

    @media all and (min-width: 768px){
        .account-container{
            padding-left: calc(256px + 32px);
            flex-wrap: wrap;
            flex-direction: row;
            align-items: stretch;
            margin-bottom: 16px;

        }
    }
</style>
