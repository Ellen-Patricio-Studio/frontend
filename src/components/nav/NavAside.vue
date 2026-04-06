<script setup>
import Avatar from '@/components/Avatar.vue';

import NavLink from './NavLink.vue';
import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'

    
</script>

<template>
    <div id="nav-aside">
        <div class="topo">
            <div class="logo-area">
                <img src="@/assets/images/logo.jpeg" alt="">
                <span>Ellen Patricio Studio</span>
            </div>
            <ul>
                <NavLink icon="material-symbols:dashboard-rounded" texto="Dashboard" active="true"></NavLink>
                <NavLink icon="solar:calendar-bold" texto="Agendamentos"></NavLink>
                <NavLink icon="boxicons:dollar" texto="Financeiro"></NavLink>
                <NavLink icon="fa7-solid:gears" texto="Serviços"></NavLink>
                <NavLink icon="fluent:people-team-24-filled" texto="Equipe"></NavLink>
            </ul>
        </div>
        <div class="bottom">
            <Avatar :src="imgAvatar" alt="Foto de perfil do usuário" name="Ellen Patricio" role="Admin"></Avatar>
            <Icon icon="famicons:log-out" class="nav-icon" />
        </div>
    </div>
</template>

<style lang="scss">
    #nav-aside{
        @include flex(column, space-between, center);
        width: 256px;
        height: 100vh;
        background-color: var(--cards);
        position: fixed;
        top: 0;
        box-shadow: 2px 0px 4px 0px rgba(0,0,0,0.06);

        
        .topo{
            @include flex(column, space-between, start);
            width: 100%;
            padding: 10px;
        
            .logo-area{
                @include flex(row, center, center);
                gap: 8px;
                height: 80px;
                padding: 0 8px;

                img{
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                }

                span{
                    font-size: 14px;
                    font-weight: bold;
                    color: var(--cinza-nav);

                }
            }

            ul{
                @include flex(column, start, start);
                width: 100%;
                gap: 8px;
                
                li{
                    @include flex(row, start, center);
                    width: 100%;
                    height: 50px;
                    padding: 0 16px;
                    gap: 16px;
                    box-shadow: none;

                    p{
                        font-size: 14px;
                    }

                    &:active{
                        background-color: red !important;
                        columns: yellow;
                    }
                }
            }
        }

        .bottom{
            width: 100%;
            height: 80px;
            @include flex(row, space-between, center);
            padding: 8px 32px 8px 8px;
            box-shadow: 0px -2px 4px 0px rgba(0,0,0,0.06);

            .nav-icon{
                width: 24px;
                height: 24px;
                color: var(--cinza-nav);
            }
        }
    }
</style>