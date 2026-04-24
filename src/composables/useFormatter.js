export function useFormatter() {
    const formatarMoeda = (valor) => {
        const n = parseFloat(valor) || 0;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(n);
    };

    return { formatarMoeda };
}