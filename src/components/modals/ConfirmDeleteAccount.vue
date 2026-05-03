<script setup>
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore()
const allert = ref('')
const router = useRouter()

const props = defineProps({
    toggleModal: Function,

    title: String,
    acao: String,
})

const excluir = async () => {

    const response = await auth.excluirConta()

    if (response.success) {
        alert('Sua conta foi excluida. Você será redirecionado para o a área de login.')
        await router.push({name: 'login'})

    } else {
        allert.value = response.message
    }
}

</script>

<template>
    <div class="box box-modal box-resume-appointment">
        <div class="top">
            <p class="title">{{title}}</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal(acao)" aria-label="Fechar"/>
        </div>
        <hr>
        <div class="info">
             <div class="resume-details">
                <p>Tem certeza que deseja {{ acao }}?</p>
             </div>
             <p v-if="allert !== ''" class="alert">{{ allert }}</p>
             <div class="buttons">
                 <button class="button-rosa button-voltar" @click.prevent="toggleModal(acao)" aria-label="Cancelar">Cancelar</button>
                 <button class="button-rosa" 
                    @click.prevent="excluir" aria-label="Confirmar">Confirmar
                </button>
             </div>
        </div>
    </div>
</template>

<style lang="scss">
.box-resume-appointment {
    .info {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 16px 0;

        .resume-details {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .detail-item {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--cinza-nav);
                
                &.total {
                    margin-top: 8px;
                    font-size: 1.1rem;
                    color: var(--rosa-nav);
                }
            }
        }
    }

    .buttons {
        width: 100%;
        @include flex(row, space-between, center);
        gap: 16px;

        .button-rosa {
            width: 100%;
            height: 40px;
            cursor: pointer;
        }
    }
}
</style>