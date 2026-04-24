<script setup>
import Avatar from '../Avatar.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/useAuthStore';
const auth = useAuthStore();

defineProps({
    src: String,
    alt: String,
    name: String,
    role: String,
    hour: String,
    status: String,
    professional: String
})
</script>

<template>
    <li class="appointments-list-item">
        <div class="left">
            <p class="service-name">{{ role }}</p>
            <Avatar :src="imgAvatar" :alt="alt" :name="name" :hour="hour"></Avatar>
            <p class="professional">
                <Icon icon="healthicons:city-worker" class="icon"/>
                <span>{{ professional }}</span>
            </p>
            
            <div class="actions">
                <template v-if="auth.isCliente && (status === 'AGENDADO' || status === 'CONFIRMADO')">
                    <button v-if="status === 'AGENDADO'" class="btn-action confirm">Confirmar</button>
                    <button class="btn-action cancel">Cancelar</button>
                </template>

                <template v-if="auth.isPeloMenosFuncionario && (status === 'CONFIRMADO' || status === 'AGENDADO')">
                    <button class="btn-action done">Realizado</button>
                    <button class="btn-action absent">Ausente</button>
                </template>
            </div>
        </div>
        
        <div class="right">
            <span :class="['status-badge', status.toLowerCase()]">{{ status }}</span>
        </div>
    </li>
</template>

<style lang="scss">
    .appointments-list-item {
        @include flex(row, space-between, start);
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

        .actions {
            @include flex(row, start, center);
            gap: 8px;
            margin-top: 8px;

            .btn-action {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 11px;
                cursor: pointer;
                border: 1px solid #ccc;
                background: #fff;
                
                &.confirm { color: green; border-color: green; }
                &.cancel { color: red; border-color: red; }
                &.done { background: var(--azul-claro-box); color: var(--azul-escuro-box); }
                &.absent { background: #eee; color: #666; }
            }
        }

        .status-badge {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 10px;
            padding: 4px 8px;
            border-radius: 12px;
            
            &.realizado { color: green; }
            &.cancelado { color: red; }
            &.agendado { color: orange; }
        }
    }
</style>

