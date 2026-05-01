<script setup>
import { ref, watch } from 'vue';
import api from '@/services/api'
import { usePhoneMask } from '@/composables/usePhoneMask';

const {mudarForm} = defineProps({
    mudarForm: Function
})


const modeloReq = ref({
    nome_completo: '',
    telefone: '',
    email: '',
    senha: '',
    confirmar_senha: '',
})

const { formatPhone } = usePhoneMask()
watch(() => modeloReq.value.telefone, (val) => {
  modeloReq.value.telefone = formatPhone(val)
})

const loading = ref(false) // true quando estiver fazendo a requisição
const errorMsg = ref('')
const errorMsg2 = ref('')

const cadastrar = async () => {
    loading.value = true;
    errorMsg.value = ''
    errorMsg2.value = ''

    try{
        const response = await api.post('auth/cadastro', modeloReq.value);

        alert(response.data.message)
        mudarForm('login')
    } catch (error) {
        if(error.response.status === 400){
            errorMsg.value = error.response.data.errors
        } else if(error.response.status === 409){
            errorMsg2.value = error.response.data.message
        }
    } finally {
        loading.value = false
    }
}


</script>

<template>
    <form @submit.prevent="cadastrar">
        <div class="wrapper-input">
            <label for="">Nome completo</label>
            <input class="input" v-model="modeloReq.nome_completo" type="text" name="" id="" placeholder="Digite aqui..." required>
        </div>
        <div class="wrapper-input">
            <label for="">Telefone</label>
            <input class="input" v-model="modeloReq.telefone" type="text" name="" id="" placeholder="(11) 99999-9999" required>
        </div>
        <div class="wrapper-input">
            <label for="">Email</label>
            <input class="input" v-model="modeloReq.email" type="email" name="" id="" placeholder="Email@dominio.com" required>
        </div>
        <div class="wrapper-input">
            <label for="">Senha</label>
            <input class="input" v-model="modeloReq.senha" type="password" name="" id="" placeholder="Digite aqui..." required>
        </div>
        <div class="wrapper-input">
            <label for="">Repita a senha</label>
            <input class="input" v-model="modeloReq.confirmar_senha" type="password" name="" id="" placeholder="Digite aqui..." required>
        </div>
        <p class="alert" v-if="modeloReq.senha !== modeloReq.confirmar_senha">As senhas não correspondem</p>
        <p v-for="(message, idx) in errorMsg" :key="idx" class="alert">
            {{message[0]}}
        </p>
        <p v-if=errorMsg2>
            Este e-mail já está cadastrado em nosso sistema. Realize o login.
        </p>
        <button type="submit" class="button-rosa" :disabled="loading" aria-label="Submit">{{ loading ? 'Criando...' : 'Criar' }}</button>
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



