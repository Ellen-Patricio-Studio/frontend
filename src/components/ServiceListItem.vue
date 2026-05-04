<script setup>
import { Icon } from '@iconify/vue';
import EditService from './modals/EditService.vue';
import { ref, computed } from 'vue';
import FundoModais from './FundoModais.vue';
import { useCategorias } from '@/composables/useCategory';

const { categorias } = useCategorias()
const isModalOpen = ref(false)

const props = defineProps({
    id: Number,
    id_categoria: Number,
    name: String,
    time: [Number, String],
    value: [Number, String],
    active: Boolean
})

const toggleModal = () => { isModalOpen.value = !isModalOpen.value }

const nomeCategoria = computed(() => {
    const cat = categorias.value.find(c => c.id === props.id_categoria)
    return cat ? cat.nome_categoria : '—'
})

const formatarMoeda = (valor) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)

const formatarDuracao = (min) => {
    if (!min) return '—'
    const h = Math.floor(min / 60)
    const m = min % 60
    if (h && m) return `${h}h ${m}min`
    if (h)      return `${h}h`
    return `${m}min`
}
</script>

<template>
    <Teleport to="body" v-if="isModalOpen">
        <FundoModais :toggle-modal="toggleModal"></FundoModais>
        <EditService
            :id_categoria="id_categoria"
            :id="id"
            :name="name"
            :time="time"
            :value="value"
            :active="active"
            :toggle-modal="toggleModal"
        />
    </Teleport>

    <li class="svc-card" :class="{ 'svc-inactive': !active }">
        <span class="svc-name" :title="name">{{ name }}</span>
        <span class="svc-categoria">{{ nomeCategoria }}</span>
        <div class="svc-footer">
            <div class="svc-meta">
                <span class="svc-price">{{ formatarMoeda(value) }}</span>
                <span class="svc-dur">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {{ formatarDuracao(time) }}
                </span>
            </div>
            <div class="svc-actions">
                <span :class="['status-badge', active ? 'active' : 'no-active']">
                    {{ active ? 'Ativo' : 'Desativado' }}
                </span>
                <Icon
                    class="icon icon-edit"
                    icon="tabler:edit-filled"
                    @click="toggleModal"
                    aria-label="Editar serviço"
                />
            </div>
        </div>
    </li>
</template>

<style lang="scss">
.svc-card {
    background: var(--cards);
    border: 0.5px solid var(--cinza-service);
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;

    &.svc-inactive {
        opacity: .65;
    }

    .svc-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--cinza-nav);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }

    .svc-categoria {
        font-size: 11px;
        color: var(--cinza-nav);
        opacity: .7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .svc-footer {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 4px;
        border-top: 0.5px solid var(--cinza-service, #e8e6f0);
        padding-top: 8px;
    }

    .svc-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .svc-price {
        font-size: 13px;
        font-weight: 500;
        color: var(--cinza-nav);
    }

    .svc-dur {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: 11px;
        color: var(--cinza-nav);
        opacity: .7;
    }

    .svc-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    }

    .icon-edit {
        flex-shrink: 0;
        width: 15px;
        height: 15px;
        cursor: pointer;
        color: var(--azul-escuro-box);
    }
}
</style>