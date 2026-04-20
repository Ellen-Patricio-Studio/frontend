<script setup>
import Avatar from '@/components/Avatar.vue';

import NavLink from './NavLink.vue';
import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useMenuStore } from '@/stores/useMenuStore';
import { useBreakpoints } from '@/composables/useBreakpoints';
import { watch } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';

const menuStore = useMenuStore()
const { width } = useBreakpoints()    

const auth = useAuthStore()

onMounted(async () => {
    if(auth.token && !auth.user){
        await auth.carregarPerfil()
    }
})

watch(width, (newWidth) => {
    if(newWidth < 768){
        menuStore.closeMenu()
    }
})

</script>

<template>
    <div id="nav-aside" v-if="width >= 768 || menuStore.isMenuOpen === true">
        <div class="topo">
            <RouterLink :to="{name: 'dashboard'}" class="logo-area">
                <img src="@/assets/images/logo.jpeg" alt="">
                <span>Ellen Patricio Studio</span>
            </RouterLink>
            <ul>
                <NavLink  icon="material-symbols:dashboard-rounded" texto="Dashboard" active="true" redirect="dashboard"></NavLink>
                <NavLink  icon="solar:calendar-bold" texto="Agendamentos" redirect="agendamentos"></NavLink>
                <NavLink v-if="auth.isAdmin" icon="boxicons:dollar" texto="Financeiro" redirect="financas"></NavLink>
                <NavLink v-if="auth.isAdmin" icon="fa7-solid:gears" texto="Serviços" redirect="servicos"></NavLink>
                <NavLink v-if="auth.isPeloMenosFuncionario" icon="fluent:people-team-24-filled" texto="Equipe" redirect="equipe"></NavLink>
                <NavLink  icon="mdi:account" texto="Conta" redirect="conta"></NavLink>
            </ul>
        </div>
        <div class="bottom">
            <Avatar :src="imgAvatar" alt="Foto de perfil do usuário" :name="auth.user?.nome_completo || 'Carregando...'" :role="auth.roles[0] || 'Carregando...'"></Avatar>
            <RouterLink :to="{name: 'login'}">
                <Icon icon="famicons:log-out" class="nav-icon" />
            </RouterLink>
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
        z-index: 10;
        
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
                
                a{
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