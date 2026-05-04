import { defineStore } from "pinia";
import api from '@/services/api';
import { useAgendaUIStore } from "./useAgendaUIStore";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        roleString: localStorage.getItem('role') || '',
        token: localStorage.getItem('access_token') || null,
        loading: false
    }),

    getters: {
        roles: (state) => {
            // Se for nulo ou vazio, retorna array vazio para não quebrar o .map
            if (!state.roleString) return [];
            // Se por algum motivo já for um array, apenas limpa os espaços
            if (Array.isArray(state.roleString)) return state.roleString.map(r => r.trim());
            
            return state.roleString.split(',').map(r => r.trim());
        },

        isAdmin: (state) => state.roles.includes('ADMIN'),
        isFuncionario: (state) => state.roles.includes('FUNCIONARIO'),
        isCliente: (state) => state.roles.includes('CLIENTE'),

        isPeloMenosFuncionario: (state) => state.roles.some(r => ['ADMIN', 'FUNCIONARIO'].includes(r)),

        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async carregarPerfil(){ // carrega dados básicos
            this.loading = true
            try {
                const response = await api.get('/auth/perfil')
                this.user = response.data
            } catch (error) {
                console.error("Erro ao carregar dados do usuário", error)
                this.logout()
                return { error: error }
            } finally {
                this.loading = false
            }
        },

        async atualizarPerfil(data) {
            try {
                const response = await api.put('/auth/perfil', data);               
                this.user = { ...this.user, ...data };
                return { success: true };
            } catch (error) {
                return { 
                    success: false, 
                    message: error.response?.data?.message || "Erro ao atualizar" 
                };
            }
        },

        async excluirConta() {
            try {
                const response = await api.delete('/auth/excluir-conta');

                this.logout(); 

                return { success: true, message: response.data.message };
            } catch (error) {
                console.error("Erro ao excluir conta:", error);
                return { 
                    success: false, 
                    message: error.response?.data?.message || "Erro ao excluir conta." 
                };
            }
        },

        setAuth(token, role){
            this.token = token
            const formattedRole = Array.isArray(role) ? role.join(',') : role;
            this.roleString = formattedRole
            localStorage.setItem('access_token', token)
            localStorage.setItem('role', formattedRole)
        },

        logout(){
            const agenda = useAgendaUIStore()

            this.user = null
            this.token = null
            this.roleString = ''
            localStorage.removeItem('access_token');
            localStorage.removeItem('role')
            agenda.resetFiltros()
        }
    }
})