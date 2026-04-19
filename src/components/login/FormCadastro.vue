<script setup>
import imgAvatar from '@/assets/images/logo.jpeg'
import { useRedirect } from '@/composables/useRedirect';

const { handleSubmit } = useRedirect()

</script>

<template>
    <form action="" @submit.prevent="handleSubmit('login')">
        <div class="wrapper-input">
            <label for="">Nome completo</label>
            <input type="text" name="" id="" placeholder="Email@dominio.com">
        </div>
        <div class="wrapper-input">
            <label for="">Telefone</label>
            <input type="number" name="" id="" placeholder="Email@dominio.com">
        </div>
        <div class="wrapper-input">
            <label for="">Email</label>
            <input type="email" name="" id="" placeholder="Email@dominio.com">
        </div>
        <div class="wrapper-input">
            <label for="">Senha</label>
            <input type="password" name="" id="" placeholder="●●●●●●●●●●">
        </div>
        <div class="wrapper-input">
            <label for="">Repita a senha</label>
            <input type="password" name="" id="" placeholder="●●●●●●●●●●">
        </div>
        <input type="submit" class="button-rosa" value="Criar"/>
    </form>
</template>



<style lang="scss">
    .container-login{
        form{
            width: 100%;
            @include flex(column, center, center);
            gap: 32px;

            .wrapper-input{
                width: 100%;
                @include flex(column, center, start);
                gap: 8px;
    
                label{
                    @include flex(row, space-between, start);
                    width: 100%;
                    
                    a{
                        color: #219292;
                    }
                }
    
                input{
                    width: 100%;
                    height: 50px;
                    @include flex(row, start, center);
                    border: 1px solid rgba(117, 117, 117, 0.247);
                    border-radius: 8px;
                    padding-left: 16px;
                }   
            }

            .wrapper-checkbox{
                @include flex(row, start, center);
                width: 100%;
                gap: 8px;
            }
        }
    }
</style>



