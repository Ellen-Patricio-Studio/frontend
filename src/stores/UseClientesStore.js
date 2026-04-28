// stores/useClientesStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api' // ajuste conforme seu setup de axios/fetch

export const useClientesStore = defineStore('clientes', () => {
    const clientes = ref([])
    const clienteSelecionado = ref(null)
    const loading = ref(false)
    const error = ref(null)

    // Paginação
    const totalPages = ref(1)
    const currentPage = ref(1)
    const total = ref(0)

    const carregarClientes = async (page = 1) => {
        loading.value = true
        error.value = null
        try {
            const response = await api.get(`/admin/clientes?page=${page}`)
            clientes.value = response.data.items
            totalPages.value = response.data.pages
            currentPage.value = response.data.current_page
            total.value = response.data.total
        } catch (err) {
            error.value = err.response?.data?.message || 'Erro ao carregar clientes.'
        } finally {
            loading.value = false
        }
    }

    const buscarPorId = async (id) => {
        loading.value = true
        error.value = null
        try {
            // Busca direto da lista já carregada ou faz nova requisição
            const encontrado = clientes.value.find(c => c.id == id)
            if (encontrado) {
                clienteSelecionado.value = encontrado
            } else {
                const response = await api.get(`/admin/clientes`)
                const todos = response.data.items
                clienteSelecionado.value = todos.find(c => c.id == id) || null
            }
        } catch (err) {
            error.value = err.response?.data?.message || 'Erro ao buscar cliente.'
        } finally {
            loading.value = false
        }
    }

    const cadastrarCliente = async (data) => {
        try {
            const response = await api.post('/admin/clientes', data)
            return { success: true, data: response.data }
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Erro ao cadastrar cliente.' }
        }
    }

    const editarCliente = async (id, data) => {
        try {
            const response = await api.put(`/admin/clientes/${id}`, data)
            return { success: true, data: response.data }
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Erro ao editar cliente.' }
        }
    }

    const excluirCliente = async (id) => {
        try {
            await api.delete(`/auth/excluir-conta/${id}`)
            clientes.value = clientes.value.filter(c => c.id !== id)
            return { success: true }
        } catch (err) {
            return { success: false, error: err.response?.data?.message || 'Erro ao excluir cliente.' }
        }
    }

    return {
        clientes,
        clienteSelecionado,
        loading,
        error,
        totalPages,
        currentPage,
        total,
        carregarClientes,
        buscarPorId,
        cadastrarCliente,
        editarCliente,
        excluirCliente
    }
})