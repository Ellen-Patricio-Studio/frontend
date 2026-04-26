<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { ref, watch } from 'vue';
import { usePhoneMask } from '@/composables/usePhoneMask';
import { useEquipeStore } from '@/stores/useEquipeStore';
import { computed } from 'vue';
import { useServiceStore } from '@/stores/useServiceStore';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const auth = useAuthStore()
const serviceStore = useServiceStore()
const equipeStore = useEquipeStore()
const alert2 = ref('')

const props = defineProps({
    id: Number,
    name: String,
    email: String,
    tel: String,
    active: Boolean,
    categorias: Array,
    toggleModal: Function
})

// const categoriasSelecionadas = ref(props.categorias && props.categorias.length > 0 ? props.categorias.map(c => c.id) : null);
const categoriasSelecionadas = ref(
  props.categorias && props.categorias.length > 0 
    ? props.categorias.map(c => typeof c === 'object' ? c.id : c) 
    : [null]
);

const dataForm = ref({
    nome_completo: props.name,
    email: props.email,
    telefone: props.tel,
    nova_senha: '',
    confirmar_nova_senha: '',
    ativo: props.active,
    ids_categorias: categoriasSelecionadas.value
})

watch(() => props.name, () => {
    dataForm.value.nome_completo = props.name;
    dataForm.value.email = props.email;
    dataForm.value.telefone = props.tel;
    dataForm.value.ativo = props.active;
}, { immediate: true })

watch(() => props.categorias, (newVal) => {
    if (newVal && newVal.length > 0) {
        // Mapeia para ID caso venha o objeto completo do banco
        categoriasSelecionadas.value = newVal.map(c => typeof c === 'object' ? c.id : c);
    } else {
        categoriasSelecionadas.value = [null];
    }
}, { immediate: true });

const { formatPhone } = usePhoneMask()
watch(() => dataForm.value.telefone, (val) => {
  dataForm.value.telefone = formatPhone(val)
})

onMounted(() => {
  if (auth.isAdmin) {
    serviceStore.carregarCategorias()
  }
});

const atualizar = async () => {
    dataForm.value.ids_categorias = categoriasSelecionadas.value

    if(categoriasSelecionadas.value[categoriasSelecionadas.value.length-1] === null ){
        alert2.value = 'Favor selecionar categoria'
        return
    }

    const response = await equipeStore.atualizarFuncionario(props.id, dataForm.value)
    
    if(response.success){
        window.location.reload();
    } else{
        alert2.value = response.error
    }
}

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
if (!serviceStore.categorias.length) return false;

  const temEspaco = categoriasSelecionadas.value.length < serviceStore.categorias.length;
  const ultimaEscolha = categoriasSelecionadas.value[categoriasSelecionadas.value.length - 1];
  
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
            <p class="title">Editar funcionário</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()"/>
        </div>
        <hr>
        <form @submit.prevent="atualizar" class="form">
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
                <label>Nova senha</label>
                <input v-model="dataForm.nova_senha" type="password" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <label>Repita a nova senha</label>
                <input v-model="dataForm.confirmar_nova_senha" type="password" name="" id="" class="input">
            </div>
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
            <div class="wrapper-input wrapper-check">
                <input v-model="dataForm.ativo" type="checkbox" name="" id="">
                <label>Ativo?</label>
            </div>
            <p v-if="dataForm.nova_senha !== dataForm.confirmar_nova_senha" class="alert">As senhas não conferem</p>
            <!-- <div class="wrapper-input">
                <label class="service-wrapper">Serviços  <Icon class="icon" icon="mingcute:add-fill" /> </label>
                <select class="input">
                    <option value="1">Cabeleireiro</option>
                    <option value="1">Manicure</option>
                    <option value="1">Pedicure</option>
                    <option value="1">Geral</option>
                </select>
            </div> -->
            <!-- <div class="wrapper-input">
                <label>Cargo</label>
                <select class="input">
                    <option value="1">Funcionário</option>
                    <option value="1">Administrador</option>
                </select>
            </div> -->
            <p v-if="alert2 !== ''" class="alert">{{alert2}}</p>
            <button class="button-rosa button-voltar" @click="toggleModal">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">



</style>
