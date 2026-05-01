<!-- components/clientes/ClientesList.vue -->
<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
    id: Number,
    name: String,
    email: String,
    tel: String
})

const linkRedirect = `/clientes/${props.id}`
</script>

<template>
    <li class="cliente-list-item box">
        <div class="cliente-info">
            <div class="avatar-placeholder">
                {{ name?.charAt(0).toUpperCase() }}
            </div>
            <div class="details">
                <p class="cliente-name">{{ name }}</p>
                <p class="cliente-email">{{ email }}</p>
            </div>
        </div>
        <div class="right">
            <Icon icon="qlementine-icons:menu-dots-16" />
            <RouterLink :to="linkRedirect" class="button-select" aria-label="Perfil">Perfil</RouterLink>
        </div>
    </li>
</template>

<style lang="scss">
.cliente-list-item {
    width: 100%;
    @include flex(row, space-between, center);
    padding: 16px;

    .cliente-info {
        @include flex(row, start, center);
        gap: 16px;

        .avatar-placeholder {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--rosa);
            color: #fff;
            @include flex(row, center, center);
            font-weight: bold;
            font-size: 16px;
            flex-shrink: 0;
        }

        .details {
            @include flex(column, start, start);
            gap: 4px;

            .cliente-name {
                font-weight: 600;
                font-size: 14px;
                color: var(--cinza-nav);
            }

            .cliente-email {
                font-size: 12px;
                opacity: 0.6;
                color: var(--cinza-nav);
            }
        }
    }

    .right {
        @include flex(row, end, center);
        gap: 16px;

        .button-select {
            cursor: pointer;
            text-decoration: none;
        }
    }
}
</style>