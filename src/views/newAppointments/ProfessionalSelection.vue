<script setup>
import { computed } from 'vue';
import { useBooking } from '@/composables/useBooking';
import { useDisponibilidadeStore } from '@/stores/useDisponibilidadeStore';
import ActiveArea from '@/components/newAppointments/ActiveArea.vue';
import ProfessionalItem from '@/components/newAppointments/ProfessionalItem.vue';
import Avatar from '@/components/Avatar.vue';
import imgAvatar from '@/assets/images/logo.jpeg';
import ConfirmAppointment from '@/components/modals/ConfirmAppointment.vue';
import { ref } from 'vue';
import FundoModais from '@/components/FundoModais.vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

const { bookingData, setProfissional, payload, resetBooking } = useBooking();
const dispStore = useDisponibilidadeStore();
const router = useRouter();
const alertt = ref('')

const profissionaisParaOHorario = computed(() => {
    return dispStore.profissionaisDisponiveis.filter(p => 
        p.slots.some(s => s.hora_inicio === bookingData.value.hora_inicio)
    );
});

const agendar = async () => {
    try {
        const response = await api.post('/agendamentos', payload.value);
        
        if (response.status === 201 || response.status === 200) {
            alert('Agendamento realizado com sucesso!');
            // resetBooking();
            router.push({ name: 'resumo' }); // Redireciona para a lista
        }
    } catch (error) {
        console.error("Erro ao agendar:", error);
        alertt.value = error.response.data.errors || 'Erro ao realizar agendamento.';
    }
}

const isModalOpen = ref(false);

const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
}
</script>

<template>
    <Teleport to="body">
            <FundoModais        v-if="isModalOpen" :toggle-modal="toggleModal" :agendar="agendar"></FundoModais>
            <ConfirmAppointment v-if="isModalOpen" :toggle-modal="toggleModal" :agendar="agendar" :alertt="alertt"></ConfirmAppointment>
    </Teleport>
    <div class="container-professionalSelection">
        <div class="box">
            <h1 class="h1 h1-top">Selecionar profissional</h1>
            <ActiveArea :activeProfessional="true" />
            
            <ul class="new-appointment-list">
                <h2 class="h2">Profissionais disponíveis para {{ bookingData.hora_inicio }}</h2>
                
                <ProfessionalItem 
                    v-for="prof in profissionaisParaOHorario" 
                    :key="prof.id_funcionario"
                    :id="prof.id_funcionario"
                    :name="prof.nome_funcionario"
                    :role="'Profissional'"
                    :checkStatus="bookingData.id_funcionario === prof.id_funcionario"
                    @click="setProfissional(prof.id_funcionario, prof.nome_funcionario)"
                />
            </ul>

            <div class="confirmation">
                <div class="selection">
                    <p class="title">Selecionado</p>
                    <Avatar :src="imgAvatar" :name="bookingData._temp.nome_funcionario || 'Selecione um profissional'"></Avatar>
                </div>
                <div class="right">
                    <RouterLink :to="{name: 'selecionar-data'}" class="button-rosa button-voltar">Voltar</RouterLink>
                    <button v-if="bookingData.id_funcionario" class="button-rosa" @click.prevent="toggleModal()">Resumo</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .container-professionalSelection{
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
                .selection{
                    @include flex(column, center, start);

                    .title{
                        font-size: 12px;
                        color: var(--cinza-nav);
                    }
                }
            }
        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);

            .confirmation{

            }
        }
    }
</style>