<script setup>
import { useRedirect } from '@/composables/useRedirect';
import { ref } from 'vue';
import api from '@/services/api'
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';

const router = useRouter()
const { handleSubmit } = useRedirect()
const modeloReq = ref({
    email: '',
    senha: ''
})

const loading = ref(false) // true quando estiver fazendo a requisição
const errorMsg = ref('')

const logar = async () => {
    loading.value = true;
    errorMsg.value = ''

    try{
        const response = await api.post('auth/login', modeloReq.value);
        const auth = useAuthStore()

        auth.setAuth(response.data.access_token, response.data.usuario.roles);
        
        await auth.carregarPerfil()

        await router.push({name: 'dashboard'})
        
        // localStorage.setItem('access_token', response.data.access_token)
        // localStorage.setItem('role', response.data.usuario.roles)
    } catch (error) {
        errorMsg.value = error.response?.data?.message
    } finally {
        loading.value = false
    }
}


</script>

<template>
    <form @submit.prevent="logar">
        <div class="wrapper-input">
            <label for="">Email</label>
            <input class="input" v-model="modeloReq.email" type="email" name="" id="" placeholder="Email@dominio.com">
        </div>
        <div class="wrapper-input">
            <label for="">Senha <a>Esqueci a senha</a></label>
            <input class="input" v-model="modeloReq.senha" type="password" name="" id="" placeholder="Digite aqui...">
        </div>
        <p v-if="errorMsg" class="alert">{{errorMsg}}</p>
        <div class="wrapper-checkbox">
            <input type="checkbox" name="" id="">
            <label for="">Lembrar-me</label>
        </div>
        <button type="submit" class="button-rosa">{{ loading ? 'Logando...' : 'Entrar'  }}</button>
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