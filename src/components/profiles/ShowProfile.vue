<script setup>
import { Icon } from '@iconify/vue';
import { useBreakpoints } from '@/composables/useBreakpoints';
const { width } = useBreakpoints()
import FundoModais from '../FundoModais.vue';
import EmployeeEdit from '../modals/EmployeeEdit.vue'; 
import { ref } from 'vue';
import TimeEdit from '../modals/TimeEdit.vue';
import DayOffEdit from '../modals/DayOffEdit.vue';

const isModalOpen = ref({
    employeeEdit: false,
    timeEdit: false,
    dayOffEdit: false
});

const toggleModal = (modal) => {
    isModalOpen.value[modal] = !isModalOpen.value[modal];
}

const isOptionShow = ref(false)

const toggleOptions = () => {
    isOptionShow.value = !isOptionShow.value;
}

const props = defineProps({
    id: Number,
    src: String,
    name: String,
    role: String,
    tel: String,
    email: String,
    active: Boolean,
    categorias: Array
})

</script>

<template>
    <teleport to="body" v-if="isModalOpen.employeeEdit">
        <FundoModais :toggle-modal=" () => toggleModal('employeeEdit')"></FundoModais>
        <EmployeeEdit :toggle-modal="() => toggleModal('employeeEdit')" :id="id" :name="name" :tel="tel" :email="email" :active="active" :categorias="categorias"></EmployeeEdit>
    </teleport>
    <teleport to="body" v-if="isModalOpen.timeEdit">
        <FundoModais :toggle-modal=" () => toggleModal('timeEdit')"></FundoModais>
        <TimeEdit :toggle-modal="() => toggleModal('timeEdit')" :id="id"></TimeEdit>
    </teleport>
    <teleport to="body" v-if="isModalOpen.dayOffEdit">
        <FundoModais :toggle-modal=" () => toggleModal('dayOffEdit')"></FundoModais>
        <DayOffEdit :toggle-modal="() => toggleModal('dayOffEdit')" :id="id"></DayOffEdit>
    </teleport>
    <div class="box container-show-profile">
        <div class="avatar-placeholder large">
            {{ name?.charAt(0).toUpperCase() }}
        </div>
        <div class="texts">
            <h1 class="h1">{{ name }}</h1>
            <!-- <p>{{ role }}</p> -->
            <p v-if="width>=768" :class="{'active': active, 'no-active': !active}">{{active ? 'Ativo' : 'Desativado'}}</p>
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
        <Icon class="icon-options" icon="ant-design:more-outlined" @click.prevent="toggleOptions"/>
        <div class="box-options" v-if="isOptionShow">
            <button class="button-select" @click="toggleModal('employeeEdit')" aria-label="Editar perfil">Editar perfil</button>
            <button class="button-select horario" @click="toggleModal('timeEdit')" aria-label="Editar turno">Editar turno</button>
            <button class="button-select horario" @click="toggleModal('dayOffEdit')" aria-label="Editar folga">Editar folga</button>
        </div>
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

        .icon-options{
            position: absolute;
            top: 16px;
            right: 16px;
            cursor: pointer;
            width: 18px;
            height: 18px;
        }

        .box-options{
            .button-select{
                cursor: pointer;

                &.horario{
                    right: 124px;
                }
            }
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

                .no-active{
                    color: var(--vermelho)
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