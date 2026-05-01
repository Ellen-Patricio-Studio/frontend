<script setup>
import { onMounted, ref, computed } from 'vue';
import { useServiceStore } from '@/stores/useServiceStore';
import { useBooking } from '@/composables/useBooking';
import { useBreakpoints } from '@/composables/useBreakpoints';
import { useFormatter } from '@/composables/useFormatter'; // Novo
import ServiceItem from '@/components/newAppointments/ServiceItem.vue';
import ActiveArea from '@/components/newAppointments/ActiveArea.vue';
import { Icon } from '@iconify/vue';

const { width } = useBreakpoints()
const { formatarMoeda } = useFormatter()
const serviceStore = useServiceStore()
const { bookingData, setServico, totalPreco, totalTempo } = useBooking()

const categoriaAtiva = ref(null); // null significa "Todos"

onMounted(async () => {
    if (serviceStore.servicos.length === 0) {
        await serviceStore.carregarServicos(1)
    }
    if (serviceStore.categorias.length === 0) {
        await serviceStore.carregarCategorias()
    }
})

const servicosFiltrados = computed(() => {
    if (!categoriaAtiva.value) return serviceStore.servicos;
    return serviceStore.servicos.filter(s => s.id_categoria === categoriaAtiva.value);
});

const selecionarCategoria = (id) => {
    categoriaAtiva.value = id;
};
</script>

<template>
    <div class="container-newAppointment">
        <div class="box">
            <h1 class="h1 h1-top">Novo agendamento</h1>
            <ActiveArea :active-service="true" />

            <div class="categories-wrapper">
                <h2 class="h2">Categorias</h2>
                <ul class="categories">
                    <li 
                        class="button-select categories-li" 
                        :class="{ 'active': categoriaAtiva === null }"
                        @click="selecionarCategoria(null)"
                        aria-label="Todos"
                    >
                        Todos
                    </li>
                    <li 
                        v-for="cat in serviceStore.categorias" 
                        :key="cat.id" 
                        class="button-select categories-li"
                        :class="{ 'active': categoriaAtiva === cat.id }"
                        @click="selecionarCategoria(cat.id)"
                        :aria-label="cat.nome_categoria"
                    >
                        {{ cat.nome_categoria }}
                    </li>
                </ul>
            </div>

            <ul class="new-appointment-list">
                <h2 class="h2">Escolher serviços</h2>
                <ServiceItem 
                    v-for="servico in servicosFiltrados" 
                    :key="servico.id"
                    :id="servico.id"
                    :service="servico.nome_servico"
                    :description="servico.nome_servico" 
                    :time="servico.duracao_minutos + ' min'"
                    :price="servico.valor"
                    :checkStatus="bookingData.id_servico === servico.id"
                    @click="setServico(servico)"
                />
            </ul>

            <div class="confirmation" v-if="bookingData.id_servico">
                <div class="resume">
                    <p class="quantity-services">1 serviço selecionado</p>
                    <p v-if="width >= 768" class="time">
                        <Icon icon="tabler:clock-filled" />
                        {{ totalTempo }}
                    </p>
                    <p class="total-services">Total : {{ formatarMoeda(totalPreco) }}</p>
                </div>
                <div class="right">
                    <RouterLink :to="{name: 'selecionar-data'}" class="button-rosa" aria-label="Prosseguir">
                        Prosseguir
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .container-newAppointment{
        padding: 16px 24px;
        margin: calc(80px + 16px) 0;
        transition: 1s;
        font-size: 14px;

        .box{
            width: 100%;
            @include flex(column, center, start);
            gap: 32px;
            padding-top: 32px;
            padding-bottom: 32px;

            .confirmation{
                .resume{
                    width: 100%;
                    @include flex(row, space-between, center);
                    color: var(--cinza-nav);
    
                    .total-services{
                        color: var(--rosa-nav);
                        font-weight: 700;
                    }
                }
            }

        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);

            .box{
                .confirmation{
                    .resume{
                        width: initial;
                        gap: 16px;

                        .time{
                            @include flex(row, start, center);
                            gap: 8px;
                        }
                    }

                }
            }

        }
    }
</style>