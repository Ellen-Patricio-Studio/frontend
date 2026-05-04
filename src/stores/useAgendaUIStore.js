import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { format, startOfToday } from 'date-fns';
import { useAgendamentosStore } from '@/stores/useAgendamentosStore';
 
export const useAgendaUIStore = defineStore('agendaUI', () => {
    const busca = ref('');
    const status = ref('');
    const funcionarioSelecionado = ref('');
    const dataSelecionada = ref(format(startOfToday(), 'yyyy-MM-dd'));
 
    function normalizeAgendamento(agendamento) {
        // Converte "DD/MM/YYYY" → "YYYY-MM-DD"
        let date = agendamento.date || agendamento.data || '';
        if (date.includes('/')) {
            const [d, m, y] = date.split('/');
            date = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
        }
 
        // Converte "HH:mm - HH:mm" → startTime + endTime
        let startTime = '';
        let endTime = '';
        let durationMin = agendamento.durationMin || 60;
 
        const horario = agendamento.horario || agendamento.startTime || '';
        if (horario.includes(' - ')) {
            [startTime, endTime] = horario.split(' - ').map(t => t.trim());
            const [sh, sm] = startTime.split(':').map(Number);
            const [eh, em] = endTime.split(':').map(Number);
            durationMin = (eh * 60 + em) - (sh * 60 + sm);
        } else {
            startTime = horario;
        }
 
        return {
            id: agendamento.id,
            cliente: agendamento.cliente || agendamento.client || '',
            servico: agendamento.servico || agendamento.service || '',
            status: agendamento.status || '',
            funcionario: agendamento.funcionario || '',
            funcionario_id: agendamento.funcionario_id || agendamento.professionalId || null,
            date,
            startTime,
            endTime,
            durationMin,
            // manter campos originais para compatibilidade com AppointmentsList
            data: date,
            horario: agendamento.horario || agendamento.startTime || '',
        };
    }
 
    const agendamentosStore = useAgendamentosStore();
 
    const agendamentosNormalizados = computed(() =>
        agendamentosStore.agendamentos.map(normalizeAgendamento)
    );
 
    // Aplica busca + status + funcionário, SEM filtrar por data.
    // Usado pelo calendário (que filtra dia internamente) e como base para a lista.
    const agendamentosFiltrados = computed(() => {
        return agendamentosNormalizados.value.filter(a => {
            const termoBusca = busca.value.toLowerCase();
            const matchBusca = !termoBusca ||
                a.cliente.toLowerCase().includes(termoBusca) ||
                a.servico.toLowerCase().includes(termoBusca);
 
            const matchStatus = !status.value || a.status === status.value;
 
            // Bug 1 corrigido: filtrar por nome do funcionário, pois a API não retorna id
            const matchFuncionario = !funcionarioSelecionado.value ||
                a.funcionario === funcionarioSelecionado.value;
 
            return matchBusca && matchStatus && matchFuncionario;
        });
    });
 
    // Filtro completo incluindo data — usado pela lista de agendamentos
    const agendamentosDoDiaFiltrados = computed(() =>
        agendamentosFiltrados.value.filter(a => a.date === dataSelecionada.value)
    );
 
    function setData(novaData) {
        dataSelecionada.value = novaData;
    }

    function resetFiltros() {
        busca.value = '';
        status.value = '';
        funcionarioSelecionado.value = '';
        dataSelecionada.value = format(startOfToday(), 'yyyy-MM-dd');
    }
 
    return {
        busca,
        status,
        funcionarioSelecionado,
        dataSelecionada,
        agendamentosNormalizados,
        agendamentosFiltrados,
        agendamentosDoDiaFiltrados,
        normalizeAgendamento,
        setData,
        resetFiltros,
    };
});