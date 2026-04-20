import { defineStore } from "pinia";
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        roleString: localStorage.getItem('role') || '',
        token: localStorage.getItem('access_token') || null,
        loading: false
    }),

    getters: {
        roles: (state) => state.roleString.split(','),

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
            } finally {
                this.loading = false
            }
        },

        setAuth(token, role){
            this.token = token
            this.roleString = role
            localStorage.setItem('access_token', token)
            localStorage.setItem('role', role)
        },

        logout(){
            this.user = null
            this.token = null
            this.roleString = ''
            localStorage.removeItem('access_token');
            localStorage.removeItem('role')
        }
    }
})