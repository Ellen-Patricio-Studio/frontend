<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useEquipeStore } from '@/stores/useEquipeStore';
import { ref, watch } from 'vue';
import { usePhoneMask } from '@/composables/usePhoneMask';
import { useServiceStore } from '@/stores/useServiceStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { onMounted } from 'vue';
import { computed } from 'vue';

const auth = useAuthStore()
const serviceStore = useServiceStore()
const equipeStore = useEquipeStore()
const allert = ref('')
const alert2 = ref('')

defineProps({
    toggleModal: Function
})

const categoriasSelecionadas = ref([null]);


const dataForm = ref({
    nome_completo: '',
    email: '',
    telefone: '',
    senha: '',
    confirmar_senha: '',
    ids_categorias: categoriasSelecionadas.value
})

const { formatPhone } = usePhoneMask()
watch(() => dataForm.value.telefone, (val) => {
  dataForm.value.telefone = formatPhone(val)
})

const enviar = async () => {
    if(categoriasSelecionadas.value[categoriasSelecionadas.value.length-1] === null ){
        alert2.value = 'Favor selecionar categoria'
        return
    }

    const response = await equipeStore.cadastrarFuncionario(dataForm.value)
    if(response.success){
        window.location.reload();
    } else{
        alert2.value = response.error
    }
}

onMounted(() => {
  if (auth.isAdmin) {
    serviceStore.carregarCategorias()
  }
});


const adicionarSelecao = () => {
  if (podeAdicionarMais) {
    categoriasSelecionadas.value.push(null);
  }
};

const removerSelecao = (index) => {
  if (categoriasSelecionadas.value.length > 1) {
    categoriasSelecionadas.value.splice(index, 1);
  }
};

const podeAdicionarMais = computed(() => {
    console.log(categoriasSelecionadas.value)
  // 1. Verifica se não excedeu o total de categorias cadastradas
  const temEspaco = categoriasSelecionadas.value.length < serviceStore.categorias.length;
  
  // 2. Pega o último item adicionado ao array
  const ultimaEscolha = categoriasSelecionadas.value[categoriasSelecionadas.value.length - 1];
  
  // 3. Verifica se o último item já foi preenchido (não é null ou string vazia)
  const ultimoEstaPreenchido = ultimaEscolha !== null && ultimaEscolha !== '';

  return temEspaco && ultimoEstaPreenchido;
});

const getCategoriasDisponiveis = (indexAtual) => {
  return serviceStore.categorias.filter(cat => {

    const jaSelecionadaEmOutro = categoriasSelecionadas.value.some((id, idx) => id === cat.id && idx !== indexAtual);
    return !jaSelecionadaEmOutro;
  });
};
</script>

<template>
    <div class="box box-modal">
        <div class="top">
            <p class="title">Novo funcionário</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal" aria-label="Fechar"/>
        </div>
        <hr>
        <form class="form scroll" @submit.prevent="enviar()" >
            <!-- <div class="wrapper-input">
                <label>Foto de perfil</label>
                <img :src="imgAvatar" alt="Foto de perfil">
                <div class="buttons">
                    <button class="button-select">Editar</button>
                    <button class="button-select button-remove">Remover</button>
                </div>
            </div> -->
            <div class="wrapper-input">
                <label>Nome completo</label>
                <input v-model="dataForm.nome_completo" type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Email</label>
                <input v-model="dataForm.email" type="email" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Telefone</label>
                <input v-model="dataForm.telefone" type="text" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Senha</label>
                <input v-model="dataForm.senha" type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Repita a senha</label>
                <input v-model="dataForm.confirmar_senha" type="password" name="" id="" class="input">
            </div>
            <p v-if="dataForm.senha !== dataForm.confirmar_senha" class="alert">As senhas não conferem</p>
            <div class="wrapper-input">
                <label class="service-wrapper">Categorias de serviço <Icon class="icon" icon="mingcute:add-fill" @click="adicionarSelecao" v-if="podeAdicionarMais"/> </label>
                <div v-for="(selecao, index) in categoriasSelecionadas" :key="index" class="select-row">
                    <select 
                        class="input" 
                        v-model="categoriasSelecionadas[index]"
                        required
                    >
                        <option :value="null" disabled>Selecionar</option>
                        <option 
                            v-for="categoria in getCategoriasDisponiveis(index)" 
                            :key="categoria.id" 
                            :value="categoria.id"
                        >
                            {{ categoria.nome_categoria }}
                        </option>
                    </select>
                    <Icon 
                        v-if="categoriasSelecionadas.length > 1"
                        icon="mdi:trash-can-outline" 
                        @click="removerSelecao(index)"
                        class="icon-remove"
                    />
                </div>
            </div>
            <!-- <div class="wrapper-input">
                <label>Cargo</label>
                <select class="input">
                    <option value="1">Funcionário</option>
                    <option value="1">Administrador</option>
                </select>
            </div> -->
            <p v-if="alert2 !== ''" class="alert">{{alert2}}</p>
            <button class="button-rosa button-voltar" @click="toggleModal" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">

.select-row{
    width: 100%;
    @include flex(row, start, center);
    gap: 16px;
}

.icon-remove{
    cursor: pointer;
    color: rgb(97, 22, 22);
}

</style>
