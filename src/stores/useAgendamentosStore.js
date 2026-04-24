import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAgendamentosStore = defineStore('agendamentos', {
  state: () => ({
    agendamentos: [],
    loading: false,
    error: null
  }),

  getters: {
    proximosAgendamentos: (state) => {
      return state.agendamentos.filter(a => a.status === 'AGENDADO' || a.status === 'CONFIRMADO');
    }
  },

  actions: {
    async fetchTodosAgendamentos() {
        this.loading = true;
        try {
            const { data } = await api.get('/admin/agendamentos'); 
            this.agendamentos = data.items;
        } catch (error) {
          this.error = 'Erro ao carregar agendamentos.';
          console.error(error);
      } finally {
          this.loading = false;
      }
    },

    async fetchMeusAgendamentos(filtros = {}) {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get('/agendamentos/meus', { params: filtros });
        this.agendamentos = response.data;
      } catch (err) {
        this.error = 'Erro ao carregar agendamentos.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },

    async criarAgendamento(dados) {
      this.loading = true;
      try {
        const response = await api.post('/agendamentos', dados);
        return response.data;
      } catch (err) {
        this.error = err.response?.data?.message || 'Erro ao realizar agendamento.';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async cancelarAgendamento(id) {
      this.loading = true;
      try {
        const response = await api.patch(`/agendamentos/${id}/status`, { 
          status: 'CANCELADO' 
        });

        const index = this.agendamentos.findIndex(a => a.id === id);
        if (index !== -1) {
          this.agendamentos[index].status = 'CANCELADO';
        }

        return response.data;
      } catch (err) {
        const msg = err.response?.data?.message || 'Erro ao cancelar.';
        this.error = msg;
        throw msg;
      } finally {
        this.loading = false;
      }
    },

    async confirmarAgendamento(id) {
      try {
        await api.patch(`/agendamentos/${id}/status`, { status: 'CONFIRMADO' });
        const index = this.agendamentos.findIndex(a => a.id === id);
        if (index !== -1) {
          this.agendamentos[index].status = 'CONFIRMADO';
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }
});