import { ref, computed } from 'vue'

const bookingData = ref({
    id_servico: null,
    id_funcionario: null,
    data_atendimento: null,
    hora_inicio: null,

    // Metadados para o Front-end (não enviados para a API)
    _temp: {
        nome_servico: '',
        nome_funcionario: '',
        valor: 0,
        duracao: 0
    }
})

export function useBooking() {
    
    const setServico = (servico) => {
        if (bookingData.value.id_servico === servico.id) {
            bookingData.value.id_servico = null
            bookingData.value._temp.nome_servico = ''
            bookingData.value._temp.valor = 0
            bookingData.value._temp.duracao = 0
        } else {
            bookingData.value.id_servico = servico.id
            bookingData.value._temp.nome_servico = servico.nome_servico
            bookingData.value._temp.valor = parseFloat(servico.valor) || 0 // Garante que seja número p/ evitar NaN
            bookingData.value._temp.duracao = servico.duracao_minutos || 0
        }
    }

    const setProfissional = (id, nome) => {
        bookingData.value.id_funcionario = id
        bookingData.value._temp.nome_funcionario = nome
    }

    const setHorario = (data, hora) => {
        bookingData.value.data_atendimento = data 
        bookingData.value.hora_inicio = hora
    }

    const totalPreco = computed(() => {
        return bookingData.value._temp.valor
    })

    const totalTempo = computed(() => {
        const min = bookingData.value._temp.duracao
        if (!min) return '0 min'
        if (min < 60) return `${min} min`
        const h = Math.floor(min / 60)
        const r = min % 60
        return r > 0 ? `${h}h ${r}min` : `${h}h`
    })

    const payload = computed(() => ({
        id_servico: bookingData.value.id_servico,
        id_funcionario: bookingData.value.id_funcionario,
        data_atendimento: bookingData.value.data_atendimento,
        hora_inicio: bookingData.value.hora_inicio
    }))

    const resetBooking = () => {
        bookingData.value = { 
            id_servico: null, id_funcionario: null, data_atendimento: null, hora_inicio: null,
            _temp: { nome_servico: '', nome_funcionario: '', valor: 0, duracao: 0 }
        }
    }

    return {
        bookingData,
        setServico,
        setProfissional,
        setHorario,
        totalPreco,
        totalTempo,
        payload, 
        resetBooking
    }
}