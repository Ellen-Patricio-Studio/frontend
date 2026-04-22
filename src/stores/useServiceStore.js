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
                return { success: false }
            } finally {
                this.loading = false
            }
        }
    }
})