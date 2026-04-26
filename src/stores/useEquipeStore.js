import { defineStore } from 'pinia'
import api from '@/services/api'

export const useEquipeStore = defineStore('equipe', {
    state: () => ({
        funcionarios: [],
        funcionarioSelecionado: null,
        loading: false,
        filtros: {
            busca: '',
            cargo: ''
        }
    }),

    getters: {
        funcionariosFiltrados: (state) => {
            return state.funcionarios.filter(funcionario => funcionario.nome_completo.toLowerCase().includes(state.filtros.busca.toLowerCase()))
        }
    },

    actions: {
        async carregarEquipe() {
            this.loading = true

            try{
                const response = await api.get('admin/funcionarios')
                this.funcionarios = response.data.items || response.data
            } catch (error) {
                console.error("Erro ao carregar equipe: ", error)
            } finally{
                this.loading = false
            }
        },


        async cadastrarFuncionario(data) {
            this.loading = true

            try{
                const response = await api.post('/admin/funcionarios', data)
                this.funcionarios.push(response.data)
                return { success: true }
            } catch (error){
                console.error("Erro ao cadastrar funcionário: ", error)
                return { success: false, error: error.response?.data?.message }
            } finally {
                this.loading = false
            }
        },

        async atualizarFuncionario(id, data){
            this.loading = true

            try{
                const response = await api.put(`/admin/funcionarios/${id}`, data)

                const index = this.funcionarios.findIndex(funcionario => funcionario.id === id)
                if(index !== -1){
                    this.funcionarios[index] = response.data
                }
                return { success: true }
            } catch(error) {
                console.error("Erro ao atualizar funcionário: ", error)
                return { success: false, error: error.response?.data?.message }
            } finally {
                this.loading = false
            }
        },

        async removerFuncionario(id){
            if (!confirm("Tem certeza que deseja remover este funcionário?")) return

            this.loading = true

            try{
                await api.delete(`/admin/funcionarios/${id}`)

                this.funcionarios = this.funcionarios.filter(funcionario => funcionario.id !== id)
                return { success: true }
            } catch (error) {
                console.error("Erro ao remover funcionário: ", error)
                return { success: false }
            } finally {
                this.loading = false
            }
        },

        async buscarPorId(id) {
            this.loading = true

            try{
                const response = await api.get(`/admin/funcionarios/${id}`)
                this.funcionarioSelecionado = response.data
            } catch (error ) {
                console.error ("Erro ao buscar perfil: ", error)
                this.funcionarioSelecionado = null
            } finally {
                this.loading = false
            }
        },

        async configurarHorarios(id, listaHorarios) {
            this.loading = true
            try {
                const response = await api.post(`/admin/funcionarios/${id}/horarios`, listaHorarios)
                return { success: true, message: response.data.message }
            } catch (error) {
                console.error("Erro ao configurar horários: ", error)
                return { 
                    success: false, 
                    error: error.response?.data?.errors || "Erro ao salvar horários" 
                }
            } finally {
                this.loading = false
            }
        },

        async adicionarBloqueio(id, dadosBloqueio) {
            this.loading = true;
            try {
                const response = await api.post(`/admin/funcionarios/${id}/bloqueios`, dadosBloqueio);
                return { success: true, message: response.data.message };
            } catch (error) {
                console.error("Erro ao adicionar bloqueio:", error);
                return { 
                    success: false, 
                    error: error.response?.data?.errors || "Erro ao bloquear agenda" 
                };
            } finally {
                this.loading = false;
            }
        }
    },
})