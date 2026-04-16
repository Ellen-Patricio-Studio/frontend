import { useRouter } from 'vue-router';
import { useMenuStore } from '@/stores/useMenuStore';


export function useRedirect() {
    const router = useRouter();
    const menuStore = useMenuStore()

    const handleSubmit = (routeName) => {
        // tratar rota errada
        router.push({name: routeName})
        menuStore.closeMenu()
    }

    return { handleSubmit }
}