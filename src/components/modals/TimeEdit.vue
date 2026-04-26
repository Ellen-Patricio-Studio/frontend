<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { ref, watch } from 'vue';
import { usePhoneMask } from '@/composables/usePhoneMask';
import { useEquipeStore } from '@/stores/useEquipeStore';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const auth = useAuthStore()

const equipeStore = useEquipeStore()
const alert2 = ref('')

const props = defineProps({
    toggleModal: Function,
    id: Number
})

const dias = ref([ 
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
])
const horarios = ref([ 
    '08:00:00',
    '09:00:00',
    '10:00:00', 
    '11:00:00',
    '12:00:00', 
    '13:00:00', 
    '14:00:00',
    '15:00:00',
    '16:00:00',
    '17:00:00',
    '18:00:00',
])
const mapaDias = {
    'Domingo': 0,
    'Segunda-feira': 1,
    'Terça-feira': 2,
    'Quarta-feira': 3,
    'Quinta-feira': 4,
    'Sexta-feira': 5,
    'Sábado': 6
};


const escala = ref([
    { dia_semana: null, hora_inicio: null, hora_fim: null }
])

const podeAdicionarMais = computed(() => {
    const temEspaco = escala.value.length < dias.value.length;
    const ultimo = escala.value[escala.value.length - 1];
    
    // O último turno deve estar preenchido E a saída deve ser maior que a entrada
    const turnoValido = ultimo.dia_semana && 
                        ultimo.hora_inicio && 
                        ultimo.hora_fim && 
                        ultimo.hora_fim > ultimo.hora_inicio;

    return temEspaco && turnoValido;
});

const adicionarTurno = () => {
    if (podeAdicionarMais.value) {
        escala.value.push({ dia_semana: null, hora_inicio: null, hora_fim: null });
    }
};

const removerTurno = (index) => {
    if (escala.value.length > 1) {
        escala.value.splice(index, 1);
    }
};

const getDiasDisponiveis = (indexAtual) => {
    return dias.value.filter(dia => {
        const jaSelecionadoEmOutro = escala.value.some((turno, idx) => 
            turno.dia_semana === dia && idx !== indexAtual
        );
        return !jaSelecionadoEmOutro;
    });
};

const getHorariosSaidaDisponiveis = (horaInicio) => {
  if (!horaInicio) return horarios.value;
  
  return horarios.value.filter(hora => {
    // Compara as strings de horário (ex: "10:00:00" > "08:00:00")
    return hora > horaInicio;
  });
};

const salvarEscala = async () => {
    const incompleto = escala.value.some(t => !t.dia_semana || !t.hora_inicio || !t.hora_fim);
    if (incompleto) {
        alert2.value = 'Preencha todos os campos dos turnos adicionados.';
        return;
    }

    const dadosFormatados = escala.value.map(item => ({
        // Converte "Segunda-feira" para 1
        dia_semana: mapaDias[item.dia_semana], 
        // Converte "08:00:00" para "08:00" (removendo os últimos 3 caracteres)
        hora_inicio: item.hora_inicio.substring(0, 5),
        hora_fim: item.hora_fim.substring(0, 5)
    }));

    const response = await equipeStore.configurarHorarios(props.id, dadosFormatados)
    if(response.success){
        window.location.reload();
    } else{
        alert2.value = response.error
    }
}

</script>

<template>
    <div class="box box-modal timeEdit">
        <div class="top">
            <p class="title">Editar turno</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()"/>
        </div>
        <hr>
<form @submit.prevent="salvarEscala" class="form">
            <div class="wrapper-input">
                <label class="service-wrapper">
                    Escala de Trabalho
                    <Icon 
                        v-if="podeAdicionarMais" 
                        class="icon icon-add" 
                        icon="mingcute:add-fill" 
                        @click="adicionarTurno" 
                    />
                </label>

                <div v-for="(turno, index) in escala" :key="index" class="inputs-horarios">
                    <select v-model="turno.dia_semana" class="input" required>
                        <option :value="null" disabled>dia</option>
                        <option v-for="dia in getDiasDisponiveis(index)" :key="dia" :value="dia">
                            {{ dia }}
                        </option>
                    </select>

                    <select v-model="turno.hora_inicio" class="input" required @change="turno.hora_fim = null">
                        <option :value="null" disabled>entrada</option>
                        <option v-for="hora in horarios" :key="hora" :value="hora">
                            {{ hora.substring(0, 5) }}
                        </option>
                    </select>

                    <select v-model="turno.hora_fim" class="input" required :disabled="!turno.hora_inicio">
                        <option :value="null" disabled>saída</option>
                        <option v-for="hora in getHorariosSaidaDisponiveis(turno.hora_inicio)" :key="hora" :value="hora">
                            {{ hora.substring(0, 5) }}
                        </option>
                    </select>

                    <Icon 
                        v-if="escala.length > 1" 
                        class="icon icon-remove" 
                        icon="mdi:trash-can-outline" 
                        @click="removerTurno(index)" 
                    />
                </div>
            </div>

            <p v-if="alert2 !== ''" class="alert">{{ alert2 }}</p>
            <button type="button" class="button-rosa button-voltar" @click="toggleModal">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">

.timeEdit{
    .form{
        align-items: start;

        .inputs-horarios{
            @include flex (row, start, center);
            width: 100%;
            gap: 16px;

            .icon{
                width: 48px;
                height: 48px;
                color: #218496;

                &.icon-remove{
                    color: rgb(161, 28, 28);
                }
            }
        }
    }
}

</style>
