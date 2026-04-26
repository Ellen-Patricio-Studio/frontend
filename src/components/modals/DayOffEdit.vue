<script setup>

import { Icon } from '@iconify/vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { ref, watch } from 'vue';
import { usePhoneMask } from '@/composables/usePhoneMask';
import { useEquipeStore } from '@/stores/useEquipeStore';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';

const auth = useAuthStore()
const equipeStore = useEquipeStore()
const alert2 = ref('')
const novoBloqueio = ref({
    data_bloqueio: '',
    motivo: ''
});

const props = defineProps({
    toggleModal: Function,
    id: Number,
})

const salvarBloqueio = async () => {
    if (!novoBloqueio.value.data_bloqueio) {
        alert("Selecione uma data!");
        return;
    }

    const [ano, mes, dia] = novoBloqueio.value.data_bloqueio.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const payload = {
        data_bloqueio: dataFormatada,
        motivo: novoBloqueio.value.motivo
    };

    const result = await equipeStore.adicionarBloqueio(props.id, payload);
    
    if (result.success) {
        window.location.reload();
    } else {
        alert2.value = response.error
    }
};


</script>

<template>
    <div class="box box-modal timeEdit">
        <div class="top">
            <p class="title">Editar folga</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()"/>
        </div>
        <hr>
        <form class="form" @submit.prevent="salvarBloqueio">
            <div class="wrapper-input">
                <input v-model="novoBloqueio.data_bloqueio" type="date" name="" id="" class="input">
            </div>
            <div class="wrapper-input">
                <input v-model="novoBloqueio.motivo" type="text" name="" id="" class="input" placeholder="Motivo">
            </div>
            <p v-if="alert2 !== ''" class="alert">{{ alert2 }}</p>
            <button type="button" class="button-rosa button-voltar" @click="toggleModal">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa">
        </form>
    </div>
</template>

<style lang="scss">

.timeEdit{
    .form{
        align-items: start;

        .inputs-horarios{
            @include flex (row, start, center);
            width: 100%;
            gap: 16px;

            .icon{
                width: 48px;
                height: 48px;
                color: #218496;

                &.icon-remove{
                    color: rgb(161, 28, 28);
                }
            }
        }
    }
}

</style>
