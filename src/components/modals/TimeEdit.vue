<script setup>
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted } from 'vue';
import { useEquipeStore } from '@/stores/useEquipeStore';

const equipeStore = useEquipeStore()
const alert2 = ref('')
const carregando = ref(true)

const props = defineProps({
    toggleModal: Function,
    id: Number
})

const dias = ref([
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
])
const horarios = ref([
    '00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00', '07:00:00',
    '08:00:00', '09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00',
    '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00', '23:00:00',
])

const mapaDias = {
    'Domingo': 0, 'Segunda-feira': 1, 'Terça-feira': 2, 'Quarta-feira': 3,
    'Quinta-feira': 4, 'Sexta-feira': 5, 'Sábado': 6
}
const mapaNumParaDia = Object.fromEntries(Object.entries(mapaDias).map(([k, v]) => [v, k]))

// Cada item agora representa um dia com até dois turnos
const escala = ref([
    { dia_semana: null, hora_inicio: null, hora_fim: null, hora_inicio2: null, hora_fim2: null }
])

// ─── Carrega horários existentes ao abrir ─────────────────────────────────────
onMounted(async () => {
    const data = await equipeStore.obterHorariosFuncionario(props.id)
    if (Array.isArray(data) && data.length > 0) {
        // Agrupa por dia_semana para montar a estrutura de dois turnos
        const porDia = {}
        for (const h of data) {
            const nomeDia = mapaNumParaDia[h.dia_semana] ?? null
            const hi = h.hora_inicio?.length === 5 ? h.hora_inicio + ':00' : h.hora_inicio
            const hf = h.hora_fim?.length === 5    ? h.hora_fim    + ':00' : h.hora_fim
            if (!porDia[nomeDia]) {
                porDia[nomeDia] = { dia_semana: nomeDia, hora_inicio: hi, hora_fim: hf, hora_inicio2: null, hora_fim2: null }
            } else {
                // Segundo turno do mesmo dia
                porDia[nomeDia].hora_inicio2 = hi
                porDia[nomeDia].hora_fim2 = hf
            }
        }
        escala.value = Object.values(porDia)
    }
    carregando.value = false
})

// ─── Computed / helpers ───────────────────────────────────────────────────────
const podeAdicionarMais = computed(() => {
    const temEspaco = escala.value.length < dias.value.length
    const ultimo = escala.value[escala.value.length - 1]
    const turnoValido = ultimo.dia_semana && ultimo.hora_inicio && ultimo.hora_fim &&
                        ultimo.hora_fim > ultimo.hora_inicio
    return temEspaco && turnoValido
})

const adicionarTurno = () => {
    if (podeAdicionarMais.value)
        escala.value.push({ dia_semana: null, hora_inicio: null, hora_fim: null, hora_inicio2: null, hora_fim2: null })
}

const removerTurno = (index) => {
    if (escala.value.length > 1) escala.value.splice(index, 1)
}

const getDiasDisponiveis = (indexAtual) =>
    dias.value.filter(dia =>
        !escala.value.some((turno, idx) => turno.dia_semana === dia && idx !== indexAtual)
    )

const getHorariosSaidaDisponiveis = (horaInicio) =>
    horaInicio ? horarios.value.filter(h => h > horaInicio) : horarios.value

// Entrada do 2º turno: no mínimo 1h depois da saída do 1º
const getHorariosEntrada2Disponiveis = (horaFim1) => {
    if (!horaFim1) return []
    const [hh] = horaFim1.split(':').map(Number)
    const minimoHora = hh + 1
    if (minimoHora > 23) return []
    const minimo = String(minimoHora).padStart(2, '0') + ':00:00'
    return horarios.value.filter(h => h >= minimo)
}

const getHorariosSaida2Disponiveis = (horaInicio2) =>
    horaInicio2 ? horarios.value.filter(h => h > horaInicio2) : horarios.value

// Limpa os campos do 2º turno se a saída do 1º mudar
const onHoraFim1Change = (turno) => {
    turno.hora_inicio2 = null
    turno.hora_fim2 = null
}

const onHoraInicio2Change = (turno) => {
    turno.hora_fim2 = null
}

// ─── Salvar ───────────────────────────────────────────────────────────────────
const salvarEscala = async () => {
    const incompleto = escala.value.some(t => !t.dia_semana || !t.hora_inicio || !t.hora_fim)
    if (incompleto) { alert2.value = 'Preencha todos os campos dos turnos adicionados.'; return }

    // Segundo turno: se preencheu entrada2, saída2 também é obrigatória (e vice-versa)
    const turno2Incompleto = escala.value.some(t =>
        (t.hora_inicio2 && !t.hora_fim2) || (!t.hora_inicio2 && t.hora_fim2)
    )
    if (turno2Incompleto) { alert2.value = 'Preencha a entrada e a saída do segundo turno.'; return }

    const dadosFormatados = []
    for (const item of escala.value) {
        dadosFormatados.push({
            dia_semana:  mapaDias[item.dia_semana],
            hora_inicio: item.hora_inicio.substring(0, 5),
            hora_fim:    item.hora_fim.substring(0, 5)
        })
        if (item.hora_inicio2 && item.hora_fim2) {
            dadosFormatados.push({
                dia_semana:  mapaDias[item.dia_semana],
                hora_inicio: item.hora_inicio2.substring(0, 5),
                hora_fim:    item.hora_fim2.substring(0, 5)
            })
        }
    }

    const response = await equipeStore.configurarHorarios(props.id, dadosFormatados)
    if (response.success) window.location.reload()
    else alert2.value = response.error
}
</script>

<template>
    <div class="box box-modal timeEdit">
        <div class="top">
            <p class="title">Editar turno</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()" aria-label="Fechar"/>
        </div>
        <hr>

        <div v-if="carregando" class="loading-state">
            <Icon icon="mingcute:loading-3-fill" class="icon icon-spin"/>
            <span>Carregando horários...</span>
        </div>

        <form v-else @submit.prevent="salvarEscala" class="form">
            <div class="wrapper-input">
                <label class="service-wrapper">
                    Escala de Trabalho
                    <Icon v-if="podeAdicionarMais" class="icon icon-add" icon="mingcute:add-fill" @click="adicionarTurno"/>
                </label>

                <div v-for="(turno, index) in escala" :key="index" class="inputs-horarios">
                    <select v-model="turno.dia_semana" class="input" required>
                        <option :value="null" disabled>dia</option>
                        <option v-for="dia in getDiasDisponiveis(index)" :key="dia" :value="dia">{{ dia }}</option>
                    </select>

                    <!-- Turno 1 -->
                    <select v-model="turno.hora_inicio" class="input" required @change="turno.hora_fim = null; onHoraFim1Change(turno)">
                        <option :value="null" disabled>entrada</option>
                        <option v-for="hora in horarios" :key="hora" :value="hora">{{ hora.substring(0, 5) }}</option>
                    </select>

                    <select v-model="turno.hora_fim" class="input" required :disabled="!turno.hora_inicio" @change="onHoraFim1Change(turno)">
                        <option :value="null" disabled>saída</option>
                        <option v-for="hora in getHorariosSaidaDisponiveis(turno.hora_inicio)" :key="hora" :value="hora">
                            {{ hora.substring(0, 5) }}
                        </option>
                    </select>

                    <!-- Turno 2 -->
                    <select v-model="turno.hora_inicio2" class="input" :disabled="!turno.hora_fim" @change="onHoraInicio2Change(turno)">
                        <option :value="null" disabled>entrada 2</option>
                        <option v-for="hora in getHorariosEntrada2Disponiveis(turno.hora_fim)" :key="hora" :value="hora">
                            {{ hora.substring(0, 5) }}
                        </option>
                    </select>

                    <select v-model="turno.hora_fim2" class="input" :disabled="!turno.hora_inicio2">
                        <option :value="null" disabled>saída 2</option>
                        <option v-for="hora in getHorariosSaida2Disponiveis(turno.hora_inicio2)" :key="hora" :value="hora">
                            {{ hora.substring(0, 5) }}
                        </option>
                    </select>

                    <Icon v-if="escala.length > 1" class="icon icon-remove" icon="mdi:trash-can-outline" @click="removerTurno(index)"/>
                </div>
            </div>

            <p v-if="alert2" class="alert">{{ alert2 }}</p>
            <button type="button" class="button-rosa button-voltar" @click="toggleModal" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">
.timeEdit {
    .loading-state {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 16px 0;
        color: var(--muted, #8b87a0);
        font-size: 14px;

        .icon-spin {
            animation: spin 1s linear infinite;
            width: 20px;
            height: 20px;
        }
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    .form {
        align-items: start;

        .inputs-horarios {
            @include flex(row, start, center);
            width: 100%;
            gap: 16px;

            .input{
                @media all and (max-width: 768px){
                    font-size: 7px;
                }
            }

            .icon {
                width: 48px;
                height: 48px;
                color: #218496;
                &.icon-remove { color: rgb(161, 28, 28); }
            }
        }
    }
}
</style>