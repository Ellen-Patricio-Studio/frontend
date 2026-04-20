<script setup>
import { Icon } from '@iconify/vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
const { width } = useBreakpoints()
import FundoModais from '../FundoModais.vue';
import EmployeeEdit from '../modals/EmployeeEdit.vue'; 
import { ref } from 'vue';

const isModalOpen = ref(false);

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
}

defineProps({
    id: Number,
    src: String,
    name: String,
    role: String,
    tel: String,
    email: String,
    active: Boolean
})
</script>

<template>
    <teleport to="body" v-if="isModalOpen">
        <FundoModais :toggle-modal="toggleModal"></FundoModais>
        <EmployeeEdit :toggle-modal="toggleModal" :id="id" :name="name" :tel="tel" :email="email" :active="active"></EmployeeEdit>
    </teleport>
    <div class="box container-show-profile">
        <img :src="src" />
        <div class="texts">
            <h1 class="h1">{{ name }}</h1>
            <p>{{ role }}</p>
            <p v-if="width>=768" class="active">{{active ? 'Ativo' : 'Desativado'}}</p>
            <div v-if="width>=768" class="contacts">
                <div class="contact">
                    <Icon class="icon" icon="mynaui:telephone-solid"/>
                    <p>{{tel}}</p>
                </div>
                <div class="contact">
                    <Icon class="icon" icon="mage:email-fill"/>
                    <p>{{email}}</p>
                </div>
            </div>
        </div>
        <button class="button-select" @click="toggleModal()">Editar</button>
    </div>
</template>

<style lang="scss">
    .container-show-profile{
        color: var(--cinza-nav);
        width: 100%;
        @include flex(column, space-between, center);
        gap: 16px;
        padding: 32px 0px;
        position: relative;

        .texts{
            @include flex(column, center, center);
            gap: 16px;
        }

        img{
            width: 96px;
            height: 96px;
            border-radius: 999px;
        }

        .button-select{
            position: absolute;
            right: 16px;
        }

        @media all and (min-width: 768px){
            align-items: start;
            padding-left: 32px !important;
            flex-direction: row;
            justify-content: start;
            gap: 32px;

            .texts{
                align-items: start;

                .active{
                    color: var(--verde-escuro-box);
                }

                .contacts{
                    @include flex(row, space-between, center);
                    gap: 16px;

                    .contact{
                        @include flex(row, space-between, center);
                        gap: 8px;
                    }
                }
            }
            


        }
    }
</style>