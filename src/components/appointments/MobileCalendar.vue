<script setup>
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue';
import { format, addDays, startOfToday, eachDayOfInterval, parseISO, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const props = defineProps({
    selectedDate: String,      // Data vinda do pai (opcional, se quiser sincronizar)
    appointmentsData: Array,   // Agendamentos vindos do banco/store
    professionalsData: Array   // Lista de profissionais para legenda e cores
})

const dias = ref([]);
const hoje = startOfToday();
const diasParaExibir = 30; 
const diaSelecionado = ref(format(hoje, 'yyyy-MM-dd'));

onMounted(() => {
  const intervalo = eachDayOfInterval({
    start: hoje,
    end: addDays(hoje, diasParaExibir - 1)
  });

  dias.value = intervalo.map(data => {
    return {
      id: format(data, 'yyyy-MM-dd'),
      nomeDia: format(data, 'EEE', { locale: ptBR }).replace('.', ''),
      numero: format(data, 'd'),
      isHoje: format(data, 'yyyy-MM-dd') === format(hoje, 'yyyy-MM-dd')
    };
  });
});

// ─── Lógica do Cabeçalho Dinâmico ───────────────────────────────────────────
const headerDate = computed(() => {
  const date = parseISO(diaSelecionado.value)
  if (!isValid(date)) return { name: '', day: '', monthYear: '' }
  
  return {
    name: `${format(date, 'eeee', { locale: ptBR })}-feira`,
    day: format(date, 'dd'),
    monthYear: format(date, "MMMM, yyyy", { locale: ptBR })
  }
})

const selecionarDia = (id) => {
  diaSelecionado.value = id;
};

const scrollContainer = ref(null);

const moverScroll = (direcao) => {
  if (scrollContainer.value) {
    const larguraItem = 80; 
    scrollContainer.value.scrollBy({
      left: direcao === 'proximo' ? larguraItem : -larguraItem,
      behavior: 'smooth'
    });
  }
};

// ─── Configuração de Layout ──────────────────────────────────────────────────
const START_HOUR  = 8
const END_HOUR    = 20
const SLOT_MIN    = 60
const PX_PER_MIN  = 1.5
const CARD_PAD    = 6
const START_MIN   = START_HOUR * 60
const totalHeight = computed(() => (END_HOUR - START_HOUR + 1) * SLOT_MIN * PX_PER_MIN)

function minutesToPx(min) { return min * PX_PER_MIN }
function timeToMinutes(t) {
  if (!t) return 0
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

// ─── Dados das Props (Substituição dos Estáticos) ──────────────────────────
const professionals = computed(() => props.professionalsData || [])

const appointments = computed(() => {
  if (!props.appointmentsData) return []
  
  // Mapeia os dados das props para o formato que o layout espera
  return props.appointmentsData.map(appt => ({
    ...appt,
    client: appt.cliente || appt.client,
    service: appt.servico || appt.service,
    startTime: appt.horario || appt.startTime,
    durationMin: appt.durationMin || 60,
    duration: appt.duracao || appt.duration || '1h',
    professionalId: appt.funcionario_id || appt.professionalId,
    price: appt.preco || appt.price || 0,
    expanded: !!appt.expanded
  }))
})

// ─── Lógica de colunas ────────────────────────────────────────────────────────
function getOverlappingGroup(appt) {
  const startA = timeToMinutes(appt.startTime)
  const endA   = startA + appt.durationMin
  return appointments.value.filter(b => {
    const startB = timeToMinutes(b.startTime)
    const endB   = startB + b.durationMin
    return startB < endA && endB > startA
  })
}

function getColumnInfo(appt) {
  const group = getOverlappingGroup(appt)
  group.sort((a, b) => a.id - b.id)
  return { 
    colIndex: group.findIndex(a => a.id === appt.id), 
    totalCols: group.length 
  }
}

function getCardStyle(appt) {
  const top        = minutesToPx(timeToMinutes(appt.startTime) - START_MIN)
  const naturalH   = minutesToPx(appt.durationMin)
  const height     = (appt.expanded ? Math.max(naturalH, 180) : naturalH) - 8
  const { colIndex, totalCols } = getColumnInfo(appt)
  const pct        = 100 / totalCols
  const gapPerCol  = (CARD_PAD * (totalCols + 1)) / totalCols

  return {
    top: top + 4 + 'px',
    height: height + 'px',
    left: `calc(${pct * colIndex}% + ${CARD_PAD + (colIndex > 0 ? CARD_PAD * colIndex / totalCols : 0)}px)`,
    width: `calc(${pct}% - ${gapPerCol}px)`,
    zIndex: appt.expanded ? 20 : colIndex + 1,
    transition: 'height 0.3s ease',
  }
}

const timeSlots = computed(() => {
  const slots = []
  for (let h = START_HOUR; h <= END_HOUR; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
  }
  return slots
})

function isSlotFree(slot) {
  const slotStart = timeToMinutes(slot)
  const slotEnd   = slotStart + SLOT_MIN
  return !appointments.value.some(a => {
    const s = timeToMinutes(a.startTime)
    const e = s + a.durationMin
    return s < slotEnd && e > slotStart
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getProfessionalColor(id) {
  return professionals.value.find(p => p.id === id)?.color ?? '#7c6af7'
}

function getProfessionalName(id) {
  return professionals.value.find(p => p.id === id)?.name ?? '—'
}

function statusLabel(s) {
  return { confirmado: 'Confirmado', aguardando: 'Aguardando', cancelado: 'Cancelado' }[s] ?? s
}

function toggleExpand(appt) {
  appt.expanded = !appt.expanded
}
</script>

<template>
  <div class="agenda-wrapper">
    <div class="carousel">
      <Icon icon="mingcute:left-fill" class="icon" @click="moverScroll('anterior')"/>
      <div class="circles" ref="scrollContainer">
        <div class="circle" v-for="dia in dias" :key="dia.id" :class="{active: diaSelecionado === dia.id}" @click="selecionarDia(dia.id)">
          <p>{{dia.isHoje ? 'Hoje' : dia.nomeDia}}</p>
          <p>{{dia.numero}}</p>
        </div>
      </div>
      <Icon icon="mingcute:right-fill" class="icon" @click="moverScroll('proximo')"/>
    </div>

    <div class="agenda-header">
      <div class="agenda-date">
        <span class="day-name" style="text-transform: capitalize;">{{ headerDate.name }}</span>
        <span class="day-number">{{ headerDate.day }}</span>
        <span class="month" style="text-transform: capitalize;">{{ headerDate.monthYear }}</span>
      </div>
      <div class="agenda-legend">
        <span v-for="prof in professionals" :key="prof.id" class="legend-item">
          <span class="legend-dot" :style="{ background: prof.color }"></span>
          {{ prof.name }}
        </span>
      </div>
    </div>

    <div class="agenda-body">
      <div class="time-rail" :style="{ height: totalHeight + 'px' }">
        <div v-for="slot in timeSlots" :key="slot" class="time-label" :style="{ top: minutesToPx(timeToMinutes(slot) - START_MIN) + 'px' }">
          {{ slot }}
        </div>
      </div>

      <div class="slots-area" :style="{ height: totalHeight + 'px' }">
        <div v-for="slot in timeSlots" :key="'line-' + slot" class="slot-line" :style="{ top: minutesToPx(timeToMinutes(slot) - START_MIN) + 'px' }"></div>

        <template v-for="slot in timeSlots" :key="'avail-' + slot">
          <div v-if="isSlotFree(slot)" class="slot-available" :style="{ top: minutesToPx(timeToMinutes(slot) - START_MIN) + 4 + 'px', height: minutesToPx(SLOT_MIN) - 8 + 'px' }">
            <span>Horário disponível</span>
          </div>
        </template>

        <div v-for="appt in appointments" :key="appt.id" class="appointment-card" :class="{ 'is-expanded': appt.expanded }" :style="getCardStyle(appt)" @click="toggleExpand(appt)">
          <div class="card-accent" :style="{ background: getProfessionalColor(appt.professionalId) }"></div>
          <div class="card-content">
            <div class="card-header-row">
              <strong class="client-name">{{ appt.client }}</strong>
              <span class="status-pill" :class="appt.status">{{ statusLabel(appt.status) }}</span>
            </div>
            <span class="service-name">{{ appt.service }}</span>
            <span class="duration">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {{ appt.duration }}
            </span>

            <transition name="expand">
              <div v-if="appt.expanded" class="card-details">
                <div class="detail-row">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{{ getProfessionalName(appt.professionalId) }}</span>
                </div>
                <div class="detail-price">R$ {{ appt.price.toFixed(2).replace('.', ',') }}</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Sora:wght@600;700&display=swap');

/* ── Variáveis ── */
.agenda-wrapper {
  --bg:      #f4f3f8;
  --surface: #ffffff;
  --border:  #e8e6f0;
  --text:    #1a1825;
  --muted:   #8b87a0;
  --radius:  14px;
  --shadow:  0 2px 12px rgba(80,60,140,.08);

  font-family: 'DM Sans', sans-serif;
  /* background: var(--bg); */
  min-height: 100vh;
  padding: 24px 20px 60px;
  color: var(--text);
  box-sizing: border-box;
  width: 100%;
}

*, *::before, *::after { box-sizing: border-box; }

/* ── Header ── */
.agenda-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
}

.agenda-date { display: flex; align-items: baseline; gap: 8px; }

.day-name {
  font-family: 'Sora', sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.day-number {
  font-family: 'Sora', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #7c6af7;
  line-height: 1;
}

.month { font-size: 13px; color: var(--muted); }

.agenda-legend { display: flex; gap: 14px; flex-wrap: wrap; }

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
  font-weight: 500;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Body ── */
.agenda-body { display: flex; }

/* ── Time rail ── */
.time-rail {
  width: 56px;
  flex-shrink: 0;
  position: relative;
}

.time-label {
  position: absolute;
  right: 10px;
  /* alinha o texto com a linha separadora */
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  white-space: nowrap;
  user-select: none;
}

/* ── Slots area ── */
.slots-area {
  flex: 1;
  position: relative;
  /* height é definida via :style binding para ficar em sincronia com time-rail */
}

/* Linha separadora de hora */
.slot-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border);
  pointer-events: none;
}

/* Faixa de horário livre */
.slot-available {
  position: absolute;
  left: 4px;
  right: 4px;
  border-radius: var(--radius);
  border: 1.5px dashed #d4d0e6;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.slot-available span {
  font-size: 12px;
  color: #c0bbda;
  font-weight: 500;
}

/* ── Card ── */
.appointment-card {
  position: absolute;
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: var(--shadow);
  display: flex;
  cursor: pointer;
  transition: box-shadow .2s ease, transform .15s ease;
  /* overflow é controlado via :style para o estado expandido */
}

.appointment-card:hover {
  box-shadow: 0 6px 20px rgba(80,60,140,.13);
  transform: translateY(-1px);
}

.appointment-card.is-expanded {
  box-shadow: 0 8px 32px rgba(80,60,140,.18);
}

.card-accent {
  width: 4px;
  min-width: 4px;
  border-radius: var(--radius) 0 0 var(--radius);
  align-self: stretch;
}

.card-content {
  flex: 1;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0; /* permite text-overflow funcionar */
}

.card-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
}

.client-name {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.status-pill {
  font-size: 10px;
  font-weight: 600;
  border-radius: 20px;
  padding: 2px 8px;
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1.6;
}

.status-pill.confirmado { background: #e6faf3; color: #10b981; }
.status-pill.aguardando { background: #fff8e6; color: #f59e0b; }
.status-pill.cancelado  { background: #fee2e2; color: #ef4444; }

.service-name {
  font-size: 12px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.duration {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #aaa8be;
  font-weight: 500;
  margin-top: 1px;
}

/* ── Detalhes expandidos ── */
.card-details {
  margin-top: 10px;
  border-top: 1px solid var(--border);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--muted);
}

.detail-price {
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #7c6af7;
}

.card-actions { display: flex; gap: 8px; margin-top: 2px; }

.btn-reschedule,
.btn-cancel {
  flex: 1;
  padding: 7px 0;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: opacity .15s, transform .15s;
}

.btn-reschedule:hover,
.btn-cancel:hover { opacity: .85; transform: translateY(-1px); }

.btn-reschedule { background: #7c6af7; color: #fff; }
.btn-cancel     { background: transparent; color: var(--text); border: 1.5px solid var(--border); }

/* ── Transição expand ── */
.expand-enter-active,
.expand-leave-active {
  transition: opacity .25s ease, max-height .3s ease;
  max-height: 240px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}





.carousel{
        width: 100%;
        @include flex(row, space-between, center);
        gap: 16px;
        margin-bottom: 32px;
        
        .circles{
            overflow-x: auto;
            gap: 16px;
            @include flex(row, start, center);
            flex: 1;

            .circle{
                flex-shrink: 0;
                width: 64px;
                height: 64px;
                background-color: #dfdfdf;
                border-radius: 12px;
                @include flex(column, center, center);
    
                p{
                    font-size: 12px;
                    color: var(--cinza-nav);   
                    font-weight: 300;
                }
    
                &.active{
                    background-color: mediumslateblue;
    
                    p{
                        color: white;
                    }
                }
            }

            &::-webkit-scrollbar {
                display: none;
            }
            -ms-overflow-style: none; 
            scrollbar-width: none;
        }


        .icon{
            color: var(--cinza-nav);
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }



</style>
