<script setup>
import { Icon } from '@iconify/vue';
import { ref, onMounted } from 'vue';
import { useEquipeStore } from '@/stores/useEquipeStore';

const equipeStore = useEquipeStore()
const alert2 = ref('')
const carregando = ref(true)
const bloqueios = ref([])
const removendoId = ref(null)

const novoBloqueio = ref({ data_inicio: '', data_fim: '', motivo: '' })

const props = defineProps({
    toggleModal: Function,
    id: Number,
})

// ─── Carrega bloqueios existentes ao abrir ────────────────────────────────────
onMounted(async () => {
    await carregarBloqueios()
})

const carregarBloqueios = async () => {
    carregando.value = true
    const data = await equipeStore.listarBloqueios(props.id)
    // API retorna array de { id, data_bloqueio: "DD/MM/YYYY", motivo }
    bloqueios.value = Array.isArray(data) ? data : []
    carregando.value = false
}

// ─── Remover bloqueio ─────────────────────────────────────────────────────────
const removerBloqueio = async (idBloqueio) => {
    removendoId.value = idBloqueio
    const result = await equipeStore.removerBloqueio(props.id, idBloqueio)
    if (result.success) {
        bloqueios.value = bloqueios.value.filter(b => b.id !== idBloqueio)
    } else {
        alert2.value = result.error || 'Erro ao remover bloqueio.'
    }
    removendoId.value = null
}

// ─── Adicionar bloqueio ───────────────────────────────────────────────────────
const salvarBloqueio = async () => {
    if (!novoBloqueio.value.data_inicio || !novoBloqueio.value.data_fim) {
        alert2.value = 'Selecione a data de início e fim.'
        return
    }
    if (novoBloqueio.value.data_fim < novoBloqueio.value.data_inicio) {
        alert2.value = 'A data fim não pode ser anterior à data início.'
        return
    }

    // Converte "yyyy-MM-dd" → "dd/MM/yyyy" para cada campo
    const fmt = (s) => { const [y, m, d] = s.split('-'); return `${d}/${m}/${y}` }

    const payload = {
        data_inicio: fmt(novoBloqueio.value.data_inicio),
        data_fim:    fmt(novoBloqueio.value.data_fim),
        motivo:      novoBloqueio.value.motivo
    }

    const result = await equipeStore.adicionarBloqueio(props.id, payload)
    if (result.success) {
        novoBloqueio.value = { data_inicio: '', data_fim: '', motivo: '' }
        alert2.value = ''
        await carregarBloqueios() // Recarrega a lista sem dar reload na página
    } else {
        alert2.value = result.error || 'Erro ao salvar bloqueio.'
    }
}
</script>

<template>
    <div class="box box-modal timeEdit dayOffEdit">
        <div class="top">
            <p class="title">Editar folga</p>
            <Icon class="icon" icon="mingcute:close-fill" @click="toggleModal()" aria-label="Fechar"/>
        </div>
        <hr>

        <!-- Lista de bloqueios existentes -->
        <div class="bloqueios-section">
            <p class="section-label">Folgas agendados</p>

            <div v-if="carregando" class="loading-state">
                <Icon icon="mingcute:loading-3-fill" class="icon icon-spin"/>
                <span>Carregando...</span>
            </div>

            <p v-else-if="bloqueios.length === 0" class="empty-state">
                Nenhuma folga futura cadastrada.
            </p>

            <ul v-else class="bloqueios-list">
                <li v-for="b in bloqueios" :key="b.id" class="bloqueio-item">
                    <div class="bloqueio-info">
                        <span class="bloqueio-data">{{ b.data_bloqueio }}</span>
                        <span v-if="b.motivo" class="bloqueio-motivo">{{ b.motivo }}</span>
                    </div>
                    <button
                        type="button"
                        class="btn-remover"
                        :disabled="removendoId === b.id"
                        @click="removerBloqueio(b.id)"
                        aria-label="Remover bloqueio"
                    >
                        <Icon
                            :icon="removendoId === b.id ? 'mingcute:loading-3-fill' : 'mdi:trash-can-outline'"
                            :class="{ 'icon-spin': removendoId === b.id }"
                        />
                    </button>
                </li>
            </ul>
        </div>

        <hr>

        <!-- Formulário para novo bloqueio -->
        <form class="form" @submit.prevent="salvarBloqueio">
            <p class="section-label">Adicionar folga</p>

            <div class="inputs-periodo">
                <div class="wrapper-input">
                    <label class="input-label">Início</label>
                    <div class="input-container-icon">
                        <input v-model="novoBloqueio.data_inicio" type="date" class="input input-date" required/>
                        <Icon icon="mingcute:calendar-month-line" class="input-icon" />

                    </div>
                </div>
                <div class="wrapper-input">
                    <label class="input-label">Fim</label>
                    <div class="input-container-icon">
                        <input
                            v-model="novoBloqueio.data_fim"
                            type="date"
                            class="input input-date"
                            required
                            :min="novoBloqueio.data_inicio"
                        />
                        <Icon icon="mingcute:calendar-month-line" class="input-icon" />

                    </div>
                </div>
            </div>

            <div class="wrapper-input">
                <input v-model="novoBloqueio.motivo" type="text" class="input" placeholder="Motivo (opcional)"/>
            </div>

            <p v-if="alert2" class="alert">{{ alert2 }}</p>
            <button type="button" class="button-rosa button-voltar" @click="toggleModal" aria-label="Cancelar">Cancelar</button>
            <input type="submit" value="Confirmar" class="button-rosa" aria-label="Submit">
        </form>
    </div>
</template>

<style lang="scss">
.dayOffEdit {
    .bloqueios-section {
        width: 100%;
        margin-bottom: 4px;
    }

    .section-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--muted, #8b87a0);
        text-transform: uppercase;
        letter-spacing: .5px;
        margin-bottom: 10px;
    }

    .loading-state {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--muted, #8b87a0);
        padding: 8px 0;
    }

    .empty-state {
        font-size: 13px;
        color: var(--muted, #8b87a0);
        padding: 8px 0;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
    .icon-spin { animation: spin .8s linear infinite; }

    .bloqueios-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 220px;
        overflow-y: auto;
        padding-right: 4px;

        .bloqueio-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: var(--cards);
            border: 1px solid var(--cinza-nav);
            border-radius: 10px;
            padding: 10px 14px;
            gap: 12px;
        }

        .bloqueio-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        .bloqueio-data {
            font-size: 14px;
            font-weight: 600;
            color: var(--cinza-nav);
        }

        .bloqueio-motivo {
            font-size: 12px;
            color: var(--cinza-nav);
        }

        .btn-remover {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--vermelho);
            display: flex;
            align-items: center;
            padding: 4px;
            border-radius: 6px;
            transition: background .15s;

            &:hover:not(:disabled) { background: rgba(161, 28, 28, .08); }
            &:disabled { opacity: .4; cursor: not-allowed; }

            svg, .iconify { width: 20px; height: 20px; }
        }
    }

    .inputs-periodo {
        display: flex;
        gap: 12px;
        width: 100%;

        .wrapper-input {
            flex: 1;
        }

        .input-label {
            font-size: 12px;
            color: var(--muted, #8b87a0);
            margin-bottom: 4px;
            display: block;

        }

        .input-container-icon{
            position: relative;
            display: flex;
            align-items: center;
            flex: 1;
            width: 100%;

            .input-icon {
                position: absolute;
                right: 12px;
                color: var(--cinza-nav);
                font-size: 18px;
                pointer-events: none; // O clique passa pelo ícone e atinge o input
                z-index: 2;
            }
        }

        .input-date {
            width: 100%;
            padding-right: 40px; // Espaço para o ícone não sobrepor o texto
            
            // Esconde o ícone nativo do navegador totalmente
            &::-webkit-calendar-picker-indicator {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
                cursor: pointer;
                opacity: 0; // Fica invisível mas clicável em toda a área
            }
        }
    }
}
</style>