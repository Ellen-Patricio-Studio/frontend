import { defineStore } from "pinia";
import api from "@/services/api";

export const useServiceStore = defineStore('servico', {
    state: () => ({
        servicos: [],
        categorias: [],
        pagination: {
            total: 0,
            pages: 0,
            current_page: 1
        },
        loading: false,
        servicoSelecionado: null
    }),

    getters: {
        categoriasOrdenadas: (state) => {
            return [...state.categorias].sort((a, b) => {
                // Desativados por último
                if (a.ativo !== b.ativo) return a.ativo ? -1 : 1
                // Alfabético dentro de cada grupo
                return a.nome_categoria.localeCompare(b.nome_categoria, 'pt-BR')
            })
        },

        servicosOrdenados: (state) => {
            return [...state.servicos].sort((a, b) => {
                if (a.ativo !== b.ativo) return a.ativo ? -1 : 1
                return a.nome_servico.localeCompare(b.nome_servico, 'pt-BR')
            })
        }
    },

    actions: {
        async carregarCategorias(){
            this.loading = true;

            try{
                const response = await api.get('/admin/categorias');
                this.categorias = response.data
            } catch (error){
                console.error("Erro ao carregar categorias: ", error)
            } finally {
                this.loading = false
            }
        },

        async cadastrarCategoria(nome){
            
            try{
                await api.post('/admin/categorias', {nome_categoria: nome})
                await this.carregarCategorias();
                return { success: true }
            } catch (error){
                return { 
                    success: false,
                    message: error.response?.data?.message || "Erro ao criar categoria"
                }
            }
        },

        async editarCategoria(id, data) {
            this.loading = true;
                
            try {
                // Envia PUT para /admin/categorias/:id conforme definido no Flask
                await api.put(`/admin/categorias/${id}`, data);
            
                // Atualiza a categoria localmente na lista para refletir as mudanças (nome ou status)
                const index = this.categorias.findIndex(cat => cat.id === id);
                if (index !== -1) {
                    this.categorias[index] = { ...this.categorias[index], ...data };
                }
            
                // Caso a categoria tenha sido desativada, a API desativa os serviços filhos.
                // Se 'ativo' for falso, recarregamos os serviços para garantir sincronia.
                if (data.ativo === false) {
                    await this.carregarServicos(this.pagination.current_page);
                }
            
                return { success: true };
            } catch (error) {
                console.error("Erro ao editar categoria:", error);
                return { 
                    success: false, 
                    message: error.response?.data?.message || "Erro ao editar categoria" 
                };
            } finally {
                this.loading = false;
            }
        },

        // Serviços

        async carregarServicos(page = 1){
            this.loading = true;

            try{
                const response = await api.get(`/admin/servicos?page=${page}`)

                this.servicos = response.data.items;

                this.pagination = {
                    total: response.data.total,
                    pages: response.data.pages,
                    current_page: response.data.current_page
                }
            } catch (error) {
                console.error("Erro ao carregar serviços", error)
            } finally{
                this.loading = false
            }
        },

        async cadastrarServico(data){
            this.loading = true

            try{
                await api.post('/admin/servicos', data)
                await this.carregarServicos()
                return { success: true }
            } catch (error) {
                console.error("Erro ao cadastrar serviço", error)
                return { success: false, errors: error.response?.data?.errors}
            } finally {
                this.loading = false
            }
        },

        async editarServico(id, data){
            this.loading = true;

            try{
                await api.put(`/admin/servicos/${id}`, data)

                const index = this.servicos.findIndex(servico => servico.id === id)
                if(index !== -1){
                    this.servicos[index] = { ...this.servicos[index], ...data }
                }
                return { success: true }
            } catch (error) {
                console.error("Erro ao editar serviço", error)
                return { success: false, message: error.response?.data?.message || "Erro desconhecido ao editar serviço" }
            } finally {
                this.loading = false
            }
        }
    }
})