// stores/useClientesStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api' // ajuste conforme seu setup de axios/fetch

export const useClientesStore = defineStore('clientes', () => {
    const clientes = ref([])
    const clienteSelecionado = ref(null)
    const loading = ref(false)
    const error = ref(null)
    const filtroBusca = ref('')

    // Paginação
    const totalPages = ref(1)
    const currentPage = ref(1)
    const total = ref(0)

    const clientesFiltrados = computed(() => {
        const busca = filtroBusca.value.toLowerCase()

        // 1. Primeiro filtramos a lista com base na busca
        let lista = clientes.value
        if (busca) {
            lista = clientes.value.filter(c => 
                c.nome_completo.toLowerCase().includes(busca) || 
                c.email.toLowerCase().includes(busca)
            )
        }

        // 2. Aplicamos a ordenação para jogar 'Anonimizado' para o fim
        // Usamos [...lista] para não mutar o array original caso necessário
        return [...lista].sort((a, b) => {
            const nomeA = a.nome_completo === 'Anonimizado'
            const nomeB = b.nome_completo === 'Anonimizado'

            if (nomeA && !nomeB) return 1  // 'a' vai para o final
            if (!nomeA && nomeB) return -1 // 'b' vai para o final
            return a.nome_completo.localeCompare(b.nome_completo)                       // mantém a ordem entre eles
        })
    })

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
        filtroBusca,
        clientesFiltrados,
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