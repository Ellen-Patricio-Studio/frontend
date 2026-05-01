<script setup>
import imgAvatar from '@/assets/images/logo.jpeg'
import FormCadastro from '@/components/login/FormCadastro.vue';
import FormLogin from '@/components/login/FormLogin.vue';
import { ref } from 'vue'
import { useThemeStore } from '@/stores/useThemeStore';
const themeStore = useThemeStore()
import { Icon } from '@iconify/vue';

const formularioAtivo = ref('login')

function mudarForm(formName){
    formularioAtivo.value = formName
}

</script>

<template>
    <div class="wrapper-login">
        <Icon icon="ri:toggle-line" @click="themeStore.toggleTheme" class="toggle-icon"/>
        <div class="box container-login">
            <div class="top">
                <img :src="imgAvatar" alt="Logo Ellen Studio" />
                <h1 class="h1">Ellen Patricio Studio</h1>
            </div>
            <div class="buttons">
                <button @click.prevent="mudarForm('login')" class="button-select"    :class="{'active': formularioAtivo === 'login'}" aria-label="Login">Login</button>
                <button @click.prevent="mudarForm('cadastro')" class="button-select" :class="{'active': formularioAtivo === 'cadastro'}" aria-label="Criar conta">Criar conta</button>
            </div>
            <FormLogin v-if="formularioAtivo === 'login'"></FormLogin>
            <FormCadastro v-else-if="formularioAtivo === 'cadastro'" :mudar-form="mudarForm"></FormCadastro>
        </div>
    </div>


</template>

<style lang="scss">
    .wrapper-login{
        @include flex(row, center,center);
        width: 100%;
        min-height: 100vh;
        padding: 32px 0;

        .toggle-icon{
            width: 24px;
            height: 24px;
            position: absolute;
            top: 8px;
            right: 8px;
            color: var(--cinza-nav);
            cursor: pointer;
        }
    }

    .container-login{
        width: 342px;
        @include flex(column, center, center);
        gap: 32px;
        padding: 32px !important;
        font-size: 14px;
        color: var(--cinza-nav);

        .top{
            width: 100%;
            @include flex(column, center, center);
            gap: 32px;

            img{
                width: 64px;
                height: 64px;
                border-radius: 999px;
            }

            h1{
                text-transform: uppercase;
            }
        }

        .buttons{
            width: 100%;
            @include flex(row, center, center);
            
            .button-select{
                flex: 1;
                border: none;

                &.active{
                    border-bottom: 2px solid var(--rosa);
                    border-radius: 0;
                }
            }
        }

        @media all and (min-width: 768px){
            width: 500px;
        }
    }
</style>