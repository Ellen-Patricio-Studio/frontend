import { ref } from 'vue';

const selectedId = ref(null);

export function useAppointmentFocus() {
    const setFocus = (id) => {
        // Se clicar no mesmo, remove o destaque (toggle)
        selectedId.value = selectedId.value === id ? null : id;
    };

    return {
        selectedId,
        setFocus
    };
}