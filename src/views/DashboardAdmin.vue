<script setup>
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import BoxInfo from '@/components/BoxInfo.vue';
import BoxGraph from '@/components/graph/BoxGraph.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useBreakpoints } from '@/composables/useBreakpoints';
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
const { width } = useBreakpoints()

</script>

<template>
    <div class="container">
        <div class="h1">Overview</div>
        <div class="boxes">
            <BoxInfo icon="solar:calendar-bold" texto="Agendamentos hoje" numero="123" background-color="--azul-claro-box" icon-color="--azul-escuro-box"></BoxInfo>
            <BoxInfo icon="boxicons:dollar" texto="Receita de hoje" numero="123" background-color="--vermelho-claro-box" icon-color="--vermelho-escuro-box"></BoxInfo>
            <BoxInfo icon="fluent:people-team-24-filled" texto="Novos clientes" numero="123" background-color="--roxo-claro-box" icon-color="--roxo-escuro-box"></BoxInfo>
        </div>
        <BoxGraph></BoxGraph>
        <ul class="appointments-list box">
           <div class="top">
               <h2 class="h2">Próximos agendamentos</h2>
               <a href="#">Ver todos</a>
           </div>
           <NextAppointments :src="imgAvatar" alt="Foto de perfil" name="Ellen patricio" role="Hidratação" hour="17:30 - 18:30" status="Pendente"></NextAppointments>
           <NextAppointments :src="imgAvatar" alt="Foto de perfil" name="Ellen patricio" role="Hidratação" hour="17:30 - 18:30" status="Pendente"></NextAppointments>
           <NextAppointments :src="imgAvatar" alt="Foto de perfil" name="Ellen patricio" role="Hidratação" hour="17:30 - 18:30" status="Pendente"></NextAppointments>
        </ul>
        <ul class="recent-appointments box" v-if="width >= 768">
            <div class="top">
                <h2 class="h2">Agendamentos recentes</h2>
                <input type="search" name="" id="input-search" placeholder="Buscar..">
            </div>
            <div class="titles">
                <p>Cliente</p>
                <p>Serviço</p>
                <p>Funcionário</p>
                <p>Data</p>
                <p>Valor</p>
                <p>Status</p>
                <p>Ação</p>
            </div>
            <RecentAppointmentsList
                :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio"  service="Manicure" 
                worker="Julia Almeida" date="Hoje, 10:30" value="R$100,00" status="Confirmado" 
            ></RecentAppointmentsList>
            
            <RecentAppointmentsList
                :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio"  service="Manicure" 
                worker="Julia Almeida" date="Hoje, 10:30" value="R$100,00" status="Confirmado" 
            ></RecentAppointmentsList>

            <RecentAppointmentsList
                :src="imgAvatar" alt="Foto de perfil" name="Ellen Patricio"  service="Manicure" 
                worker="Julia Almeida" date="Hoje, 10:30" value="R$100,00" status="Confirmado" 
            ></RecentAppointmentsList>

        </ul>
        <button class="button-rosa btn-dash">+ Novo agendamento</button>
    </div>
</template>

<style lang="scss">
    .container{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;


        .boxes{
            width: 100%;
            @include flex(row, space-between, center);
            gap: 16px;
            flex-wrap: wrap;
        }

        .appointments-list{
            width: 100%;
            @include flex(column, center, center);
            gap: 32px;
            padding-top: 24px;

            .top{
                @include flex(row, space-between, center);
                width: 100%;
                margin-bottom: 16px;

                a{
                    color: #3fa5d4;
                    font-size: 14px;
                }
            }
        }
    }

    @media all and (min-width: 768px){
        .container{
            padding-left: calc(256px + 32px);
            flex-wrap: wrap;
            flex-direction: row;
            align-items: stretch;
            margin-bottom: 16px;
            

            .h1{
                height: 80px;
                background-color: var(--cards);
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                border-left: 1px solid rgba(0, 0, 0, 0.06);
                width: calc(100vw - 256px - 16px);
                position: absolute;
                left: 256px;
                top: 0;
                @include flex(row, start, center);
                padding-left: 32px;
            }

            .appointments-list{
                flex: 1;
                justify-content: start;
                min-width: 300px;
                
            }

            .recent-appointments{
                width: 100%;
                @include flex(column, center, center);
                padding-top: 24px;
                gap: 32px;
                color: var(--cinza-nav);

                .top{
                    width: 100%;
                    @include flex(row, space-between, center);

                    #input-search{
                        outline: none;
                        border: 1px solid rgba(0, 0, 0, 0.12);
                        width: 256px;
                        border-radius: 8px;
                        height: 36px;
                        padding-left: 8px;
                    }
                }
                
                .titles{
                    width: 100%;
                    @include flex(row, start, center);
                    text-transform: uppercase;
                    font-size: 12px;

                    p{
                        flex: 1;
                        text-align: center;
                        font-weight: 700;
                    }
                }
            }

            .btn-dash{
                background-color: yellow;
                width: 224px;
                height: 38px;
                position: absolute;
                top: 16px;
                right: 28px;
            }
        }
    }
</style>
