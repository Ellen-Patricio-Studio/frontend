import { defineStore } from 'pinia';
import api from '@/services/api';

export const useFinanceiroStore = defineStore('financeiro', {
  state: () => ({
    lancamentos: [],
    pagination: {
      total: 0,
      pages: 0,
      currentPage: 1
    },
    dashboardOperacional: null,
    dashboardFinanceiro: null,
    loading: false
  }),

  actions: {
    // ─── GESTÃO DE LANÇAMENTOS ──────────────────────────────────────────
    async fetchLancamentos(params = {}) {
      this.loading = true;
      try {
        // params pode conter: page, id_categoria_financeira, data_inicio, forma_pagamento
        const response = await api.get('/financeiro/lancamentos', { params });
        this.lancamentos = response.data.items;
        this.pagination = {
          total: response.data.total,
          pages: response.data.pages,
          currentPage: response.data.current_page
        };
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Erro ao carregar lançamentos."
        };
      } finally {
        this.loading = false;
      }
    },

    async conciliarPagamento(id, formaPagamento) {
      try {
        const response = await api.patch(`/financeiro/lancamentos/${id}/pagamento`, {
          forma_pagamento: formaPagamento
        });
        return { success: true, message: response.data.message };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Erro ao processar pagamento."
        };
      }
    },

    // ─── DASHBOARDS ─────────────────────────────────────────────────────
    async fetchDashboardOperacional() {
      this.loading = true;
      try {
        const response = await api.get('/financeiro/dashboard/operacional');
        this.dashboardOperacional = response.data;
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Erro ao carregar dashboard operacional."
        };
      } finally {
        this.loading = false;
      }
    },

    async fetchDashboardFinanceiro(dataInicio = null, dataFim = null) {
      this.loading = true;
      try {
        const params = {};
        if (dataInicio) params.data_inicio = dataInicio;
        if (dataFim) params.data_fim = dataFim;

        const response = await api.get('/financeiro/dashboard/financeiro', { params });
        this.dashboardFinanceiro = response.data;
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Erro ao carregar dashboard financeiro."
        };
      } finally {
        this.loading = false;
      }
    },

    // ─── AUDITORIA ──────────────────────────────────────────────────────
    async fetchLogsAuditoria(idAgendamento) {
      try {
        const response = await api.get(`/financeiro/auditoria/${idAgendamento}`);
        return { success: true, data: response.data };
      } catch (error) {
        return {
          success: false,
          message: error.response?.data?.message || "Erro ao carregar logs de auditoria."
        };
      }
    }
  }
});