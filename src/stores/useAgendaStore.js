// Esta Store vai gerenciar a lista, a paginação e os filtros.

import { defineStore } from 'pinia'
import api from '@/services/api'
import { useAuthStore } from './useAuthStore'

export const useAgendaStore = defineStore('agenda', {
    state: () => ({
        agendamentos: [],
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        loading: false,
        filtros: {
            status: '',
            data: ''
        }
    }),

    actions: {
        async carregarAgendamentos(pagina = 1){
            this.loading = true
            const auth = useAuthStore()

            const url = auth.isAdmin ? '/admin/agendamentos' : '/agendamentos/meus'

            try{
                const response = await api.get(url, {
                    params: {
                        page: pagina,
                        status: this.filtros.status,
                        data: this.filtros.data
                    }
                })

                if(auth.isAdmin){
                    this.agendamentos = response.data.items
                    this.totalItems = response.data.total
                    this.totalPages = response.data.pages 
                } else{
                    this.agendamentos = response.data
                    this.totalItems = response.data.length
                }

                this.currentPage = pagina
            } catch (error) {
                console.error("Erro ao carregar agenda: ", error)
            } finally {
                this.loading = false
            }
        }
    }
})