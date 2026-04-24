import { defineStore } from 'pinia'
import api from '@/services/api'

export const useDisponibilidadeStore = defineStore('disponibilidade', {
    state: () => ({
        profissionaisDisponiveis: [],
        loading: false,
        error: null
    }),

    actions: {
        /**
         * @param {Number} idServico 
         * @param {String} data - Formato DD/MM/AAAA
         */
        async buscarDisponibilidade(idServico, data) {
            this.loading = true
            this.error = null
            this.profissionaisDisponiveis = []

            try {
                const response = await api.get('/agendamentos/disponibilidade', {
                    params: {
                        id_servico: idServico,
                        data: data
                    }
                })
                
                this.profissionaisDisponiveis = response.data
            } catch (err) {
                console.error("Erro ao buscar disponibilidade:", err)
                this.error = err.response?.data?.message || "Erro ao carregar horários."
                this.profissionaisDisponiveis = []
            } finally {
                this.loading = false
            }
        },

        limparDisponibilidade() {
            this.profissionaisDisponiveis = []
            this.error = null
        }
    }
})