<script setup>
import imgAvatar from '@/assets/images/logo.jpeg'

</script>

<template>
    <form action="">
        <div class="wrapper-input">
            <label for="">Email</label>
            <input type="email" name="" id="" placeholder="Email@dominio.com">
        </div>
        <div class="wrapper-input">
            <label for="">Senha <a>Esqueci a senha</a></label>
            <input type="password" name="" id="" placeholder="●●●●●●●●●●">
        </div>
        <div class="wrapper-checkbox">
            <input type="checkbox" name="" id="">
            <label for="">Lembrar-me</label>
        </div>
        <input type="submit" class="button-rosa" value="Entrar"/>
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