<script setup>
import { Icon } from '@iconify/vue';


</script>

<template>
    <li class="servicesListItem box">
        <div class="top">
            <p class="title">Corte de cabelo</p>
            <div class="icons">
                <Icon class="icon icon-edit" icon="tabler:edit-filled"/>
                <Icon class="icon icon-remove" icon="ic:outline-delete"/>
            </div>
        </div>
        <hr>
        <p class="subtitle">Categoria</p>
        <p class="descricao">Cabelo</p>
        <p class="subtitle">Descrição</p>
        <p class="descricao">Corte de cabelo</p>
        <p class="subtitle">Duração</p>
        <p class="descricao">40 min</p>
        <p class="subtitle">Valor</p>
        <p class="descricao">R$50,00</p>
        <p class="active">Ativo</p>
    </li>
</template>

<style lang="scss">
    .servicesListItem{
        min-width: 250px;
        // max-width: 250px;
        border-radius: 12px;
        border: 1px solid rgba(0, 0, 0, 0.137);
        box-shadow: none;
        @include flex(column, start, start);
        gap: 8px;
        font-size: 12px;
        flex: 1;

        .top{
            width: 100%;
            @include flex(row, space-between, center);
            font-size: 14px;

            .title{
                font-weight: bold;
                color: var(--cinza-nav);
            }

            .icons{
                @include flex(row, space-between, center);
                gap: 8px;
                cursor: pointer;
                font-size: 16px;
            
                .icon-edit{
                    color: var(--azul-escuro-box);
                }

                .icon-remove{
                    color: var(--rosa)
                }
            }
        }


        hr{
            width: 100%;
            border: 1px solid #e2e2e2;
        }

        .subtitle{
            color: var(--cinza-nav);
        }

        .active{
            color: red;

            &.active{
                color: green;
            }
        }
    }
</style>