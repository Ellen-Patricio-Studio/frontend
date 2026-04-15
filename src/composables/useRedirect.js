import { useRouter } from 'vue-router';


export function useRedirect() {
    const router = useRouter();

    const handleSubmit = (routeName) => {
        // tratar rota errada
        router.push({name: routeName})
    }

    return { handleSubmit }
}