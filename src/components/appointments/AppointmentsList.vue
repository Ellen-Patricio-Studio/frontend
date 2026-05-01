<script setup>
import Avatar from '../Avatar.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/useAuthStore';
import ConfirmModal from '../modals/ConfirmModal.vue';
import { ref } from 'vue';
import FundoModais from '../FundoModais.vue';

const auth = useAuthStore();

const props = defineProps({
    id: Number,
    src: String,
    alt: String,
    name: String,
    role: String,
    hour: String,
    status: String,
    professional: String,
    date: String,
})

const isModalOpen = ref({
    confirmar: false,
    cancelar: false,
    realizar: false,
    ausentar: false
});

const toggleModal = (modal) => {
    isModalOpen.value[modal] = !isModalOpen.value[modal];
}


</script>

<template>
    <Teleport to="body" v-if="isModalOpen.confirmar">
        <FundoModais :toggle-modal="() => toggleModal('confirmar')"></FundoModais>
        <ConfirmModal  
            :id="id"
            :toggle-modal="toggleModal"
            :allert="allert"
            :title="'Confirmar agendamento'"
            :acao="'confirmar'"
        ></ConfirmModal>
    </Teleport>
    
    <Teleport to="body" v-if="isModalOpen.cancelar">
        <FundoModais :toggle-modal="() => toggleModal('cancelar')"></FundoModais>
        <ConfirmModal  
            :id="id"
            :toggle-modal="toggleModal"
            :allert="allert"
            :title="'Cancelar agendamento'"
            :acao="'cancelar'"
        ></ConfirmModal>
    </Teleport>

    <Teleport to="body" v-if="isModalOpen.realizar">
        <FundoModais :toggle-modal="() => toggleModal('realizar')"></FundoModais>
        <ConfirmModal  
            :id="id"
            :toggle-modal="toggleModal"
            :allert="allert"
            :title="'Finalizar agendamento'"
            :acao="'realizar'"
        ></ConfirmModal>
    </Teleport>

    <Teleport to="body" v-if="isModalOpen.ausentar">
        <FundoModais :toggle-modal="() => toggleModal('ausentar')"></FundoModais>
        <ConfirmModal  
            :id="id"
            :toggle-modal="toggleModal"
            :allert="allert"
            :title="'Ausentar agendamento'"
            :acao="'ausentar'"
        ></ConfirmModal>
    </Teleport>

    <li class="appointments-list-item">
        <div class="left">
            <p class="service-name">{{ role }}</p>
            <Avatar :src="imgAvatar" :alt="alt" :name="name" :role="date" :hour="hour"></Avatar>
            <p class="professional">
                <Icon icon="healthicons:city-worker" class="icon"/>
                <span>{{ professional }}</span>
            </p>
            
        </div>
        
        <div class="right">
            <span class="status-pill" :class="`${status.toLocaleLowerCase()}`">{{ status }}</span>
            <div class="actions">
                <template v-if="auth.isCliente && (status === 'AGENDADO' || status === 'CONFIRMADO')">
                    <button v-if="status === 'AGENDADO'" class="button-select confirm" @click.prevent="toggleModal('confirmar')" aria-label="confirmar">Confirmar</button>
                    <button class="button-select cancel" @click.prevent="toggleModal('cancelar')" aria-label="cancelar">Cancelar</button>
                </template>
    
                <template v-if="auth.isPeloMenosFuncionario && (status === 'CONFIRMADO' || status === 'AGENDADO')">
                    <button class="button-select done" @click.prevent="toggleModal('realizar')" aria-label="realizar">Realizado</button>
                    <button class="button-select absent" @click.prevent="toggleModal('ausentar')" aria-label="ausentar">Ausente</button>
                </template>
            </div>
        </div>
    </li>
</template>

<style lang="scss">
    .appointments-list-item {
        @include flex(row, space-between, stretch);
        width: 100%;
        font-size: 14px;
        color: var(--cinza-nav);
        padding: 16px 24px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        border-radius: var(--border-radius);

        .service-name {
            font-weight: 600;
            color: var(--preto);
        }

        .left {
            @include flex(column, start, start);
            gap: 8px;

            .professional {
                @include flex(row, start, center);
                gap: 8px;
                font-size: 12px;

                .icon {
                    width: 16px;
                    height: 16px;
                }
            }
        }

        .right{

            @include flex(column, space-between, end);

            .actions {
                @include flex(row, end, center);
                gap: 8px;
                margin-top: 8px;
                width: 100%;
    
                .button-select{
                    padding: 4px;
                    font-size: 11px;
                    cursor: pointer;

                    &.confirm { background-color: var(--verde-ag); color: var(--cards); }
                    &.cancel { background-color: var(--vermelho-ag); color: var(--cards); }
                    &.done { background-color: var(--verde-ag); color: var(--cards); }
                    &.absent { background-color: var(--cinza-ag); color: var(--cards);}
                }
            }
        }


        .status-badge {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 10px;
            padding: 4px 8px;
            border-radius: 12px;
            
            &.realizado { color: var(--verde-ag); }
            &.cancelado { color: var(--vermelho-ag); }
            &.agendado { color: var(--laranja-ag); }
        }
    }
</style>

