<script setup>
import imgAvatar from '@/assets/images/logo.jpeg'
import FormCadastro from '@/components/login/FormCadastro.vue';
import FormLogin from '@/components/login/FormLogin.vue';

</script>

<template>
    <div class="wrapper-login">
        <div class="box container-login">
            <div class="top">
                <img :src="imgAvatar" alt="Logo Ellen Studio" />
                <h1 class="h1">Ellen Patricio Studio</h1>
            </div>
            <div class="buttons">
                <button class="button-select active">Login</button>
                <button class="button-select">Criar conta</button>
            </div>
            <FormLogin></FormLogin>
            <!-- <FormCadastro></FormCadastro> -->
        </div>
    </div>


</template>

<style lang="scss">
    .wrapper-login{
        @include flex(row, center,center);
        width: 100%;
        height: 100vh;
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