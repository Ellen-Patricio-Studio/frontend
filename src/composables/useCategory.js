import { onMounted, computed } from 'vue'
import { useServiceStore } from '@/stores/useServiceStore'

export function useCategorias() {
    const serviceStore = useServiceStore()

    onMounted(async () => {
        if (serviceStore.categorias.length === 0){
            await serviceStore.carregarCategorias()
        }
    })

    const categorias = computed(() => serviceStore.categorias)
    const isLoading = computed(() => serviceStore.loading)

    return{
        categorias,
        isLoading
    }
}