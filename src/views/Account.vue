<script setup>
import NextAppointments from '@/components/appointments/NextAppointments.vue';
import BoxInfo from '@/components/BoxInfo.vue';
import BoxGraph from '@/components/graph/BoxGraph.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { useBreakpoints } from '@/composables/useBreakpoints';
import RecentAppointmentsList from '@/components/appointments/RecentAppointmentsList.vue';
import Avatar from '@/components/Avatar.vue';
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore';
import PasswordEdit from '@/components/modals/PasswordEdit.vue';
import FundoModais from '@/components/FundoModais.vue';
import { ref } from 'vue';
import ProfileEdit from '@/components/modals/ProfileEdit.vue';


const { width } = useBreakpoints()
const authStore = useAuthStore()

onMounted(async () => {
    if(!authStore.user){
        await authStore.carregarPerfil()    
    }
})

const user = computed(() => authStore.user)

const isModalOpen = ref({
    passwordEdit: false,
    profileEdit: false,
});

const toggleModal = (modal) => {
    isModalOpen.value[modal] = !isModalOpen.value[modal];
}

</script>

<template>
    <Teleport to="body" v-if="isModalOpen.passwordEdit">
        <FundoModais  :toggle-modal="() => toggleModal('passwordEdit')" ></FundoModais>
        <PasswordEdit :toggle-modal="() => toggleModal('passwordEdit')" :data="authStore.user"  ></PasswordEdit>
    </Teleport>
    <Teleport to="body" v-if="isModalOpen.profileEdit">
        <FundoModais  :toggle-modal="() => toggleModal('profileEdit')" ></FundoModais>
        <ProfileEdit  :toggle-modal="() => toggleModal('profileEdit')" :data="authStore.user"  ></ProfileEdit>
    </Teleport>
    <div class="account-container">
        <div class="h1 h1-top">Minha conta</div>
        <div class="box profile-info">
            <Avatar :src="imgAvatar" alt="Foto de perfil" :name="user.nome_completo || 'Carregando...'" :role="user.roles[0] || 'Carregando...'"></Avatar>
            <button class="button-select" @click.prevent="toggleModal('profileEdit')" aria-label="Editar">Editar</button>
        </div>
        <ul class="box-lists box">
            <div class="top">
                <h2 class="h2">Dados pessoais</h2>
            </div>
            <div class="data-item">
                <p class="subtitle">Nome completo</p>
                <p class="data">{{user.nome_completo || '---'}}</p>
            </div>
            <div class="data-item">
                <p class="subtitle">Email</p>
                <p class="data">{{user.email || '---'}}</p>
            </div>
            <div class="data-item">
                <p class="subtitle">Telefone</p>
                <p class="data">{{user.telefone || '---'}}</p>
            </div>
            <!-- <div class="data-item">
                <p class="subtitle">Serviços</p>
                <p class="data">Corte de cabelo</p>
                <p class="data">Manicure</p>
                <p class="data">Pedicure</p>
            </div> -->
            <div class="data-item">
                <p class="subtitle">Função</p>
                <p class="data">{{user.roles[0]}}</p>
            </div>
        </ul>
        <ul class="box-lists box">
            <div class="top">
                <h2 class="h2">Senha</h2>
                <button class="button-select" @click.prevent="toggleModal('passwordEdit')" aria-label="Editar">Editar</button>
            </div>
        </ul>
    </div>
</template>

<style lang="scss">
    .account-container{
        padding: 16px 24px;
        @include flex(column, center, start);
        gap: 32px;
        margin: calc(80px + 16px) 0;
        transition: 1s;

        .profile-info{
            width: 100%;
            @include flex (row, space-between, center);
        }

        .data-item{
            width: 100%;
            font-size: 12px;

            .data{
                font-weight: bold;
            }
        }

    }

    @media all and (min-width: 768px){
        .account-container{
            padding-left: calc(256px + 32px);
            flex-wrap: wrap;
            flex-direction: row;
            align-items: stretch;
            margin-bottom: 16px;

        }
    }
</style>
