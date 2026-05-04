import axios from 'axios'
import router from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const mensagemErro = error.response?.data?.message || "";
        const status = error.response?.status;

        if (status === 401 && mensagemErro.includes("token_expired")) {
            const authStore = useAuthStore();
            
            authStore.logout(); 

            alert("Sua sessão expirou. Faça login novamente.");

            await router.push('/');

        }

        // Retorna o erro para que o catch da store/componente ainda possa ler se necessário
        return Promise.reject(error);
    }
);

export default api;