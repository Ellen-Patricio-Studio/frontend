<template>
  <div class="agenda-wrapper">
    <div class="agenda-header">
      <div class="agenda-date">
        <span class="day-name">Segunda-feira</span>
        <span class="day-number">07</span>
        <span class="month">Abril, 2026</span>
      </div>
      <div class="agenda-legend">
        <span v-for="prof in professionals" :key="prof.id" class="legend-item">
          <span class="legend-dot" :style="{ background: prof.color }"></span>
          {{ prof.name }}
        </span>
      </div>
    </div>

    <div class="agenda-body">
      <!-- Trilha de horários -->
      <div class="time-rail" :style="{ height: totalHeight + 'px' }">
        <div
          v-for="slot in timeSlots"
          :key="slot"
          class="time-label"
          :style="{ top: minutesToPx(timeToMinutes(slot) - START_MIN) + 'px' }"
        >
          {{ slot }}
        </div>
      </div>

      <!-- Área de agendamentos -->
      <div class="slots-area" :style="{ height: totalHeight + 'px' }">

        <!-- Linhas separadoras por hora -->
        <div
          v-for="slot in timeSlots"
          :key="'line-' + slot"
          class="slot-line"
          :style="{ top: minutesToPx(timeToMinutes(slot) - START_MIN) + 'px' }"
        ></div>

        <!-- Faixas "horário disponível" — apenas onde não há NENHUM card ativo -->
        <template v-for="slot in timeSlots" :key="'avail-' + slot">
          <div
            v-if="isSlotFree(slot)"
            class="slot-available"
            :style="{
              top:    minutesToPx(timeToMinutes(slot) - START_MIN) + 4 + 'px',
              height: minutesToPx(SLOT_MIN) - 8 + 'px',
            }"
          >
            <span>Horário disponível</span>
          </div>
        </template>

        <!-- Cards de agendamento -->
        <div
          v-for="appt in appointments"
          :key="appt.id"
          class="appointment-card"
          :class="{ 'is-expanded': appt.expanded }"
          :style="getCardStyle(appt)"
          @click="toggleExpand(appt)"
        >
          <div
            class="card-accent"
            :style="{ background: getProfessionalColor(appt.professionalId) }"
          ></div>
          <div class="card-content">
            <div class="card-header-row">
              <strong class="client-name">{{ appt.client }}</strong>
              <span class="status-pill" :class="appt.status">
                {{ statusLabel(appt.status) }}
              </span>
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
                <div class="card-actions">
                  <button class="btn-reschedule" @click.stop="reschedule(appt)">Reagendar</button>
                  <button class="btn-cancel" @click.stop="cancel(appt)">Cancelar</button>
                </div>
              </div>
            </transition>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ─── Configuração ─────────────────────────────────────────────────────────────
const START_HOUR  = 8
const END_HOUR    = 20
const SLOT_MIN    = 60          // minutos por linha
const PX_PER_MIN  = 1.5         // pixels por minuto  →  90px/hora
const CARD_PAD    = 6           // px de margem horizontal por card

const START_MIN   = START_HOUR * 60
const totalHeight = computed(() => (END_HOUR - START_HOUR + 1) * SLOT_MIN * PX_PER_MIN)

function minutesToPx(min) { return min * PX_PER_MIN }
function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

// ─── Profissionais ────────────────────────────────────────────────────────────
const professionals = ref([
  { id: 1, name: 'Marina Santos', color: '#7c6af7' },
  { id: 2, name: 'Carla Rocha',   color: '#f97316' },
  { id: 3, name: 'Bia Lima',      color: '#10b981' },
])

// ─── Agendamentos ─────────────────────────────────────────────────────────────
const appointments = ref([
  { id: 1, client: 'Clara Mendes',   service: 'Corte + Escova',    duration: '1h 30min', startTime: '08:00', durationMin: 90,  professionalId: 1, status: 'confirmado', price: 120, expanded: false },
  { id: 2, client: 'Roberto Silva',  service: 'Corte Masculino',   duration: '45min',    startTime: '10:00', durationMin: 45,  professionalId: 2, status: 'aguardando', price: 60,  expanded: false },
  { id: 5, client: 'Fernanda Lima',  service: 'Escova',             duration: '1h',       startTime: '10:00', durationMin: 60,  professionalId: 1, status: 'confirmado', price: 80,  expanded: false },
  { id: 3, client: 'Ana Paula',      service: 'Manicure',           duration: '1h',       startTime: '12:00', durationMin: 60,  professionalId: 3, status: 'confirmado', price: 50,  expanded: false },
  { id: 6, client: 'Patrícia Nunes', service: 'Pedicure',           duration: '1h',       startTime: '12:00', durationMin: 60,  professionalId: 2, status: 'aguardando', price: 55,  expanded: false },
  { id: 7, client: 'Vanessa Melo',   service: 'Sobrancelha',        duration: '30min',    startTime: '12:00', durationMin: 30,  professionalId: 1, status: 'confirmado', price: 35,  expanded: false },
  { id: 4, client: 'Juliana Costa',  service: 'Coloração + Corte', duration: '2h 30min', startTime: '14:00', durationMin: 150, professionalId: 1, status: 'confirmado', price: 180, expanded: false },
])

// ─── Lógica de colunas ────────────────────────────────────────────────────────
// Para cada card, calcula quais outros cards se sobrepõem no tempo
// e distribui as colunas de forma justa.

function getOverlappingGroup(appt) {
  const startA = timeToMinutes(appt.startTime)
  const endA   = startA + appt.durationMin
  return appointments.value.filter(b => {
    const startB = timeToMinutes(b.startTime)
    const endB   = startB + b.durationMin
    return startB < endA && endB > startA
  })
}

// Retorna { colIndex, totalCols } para um card
function getColumnInfo(appt) {
  const group = getOverlappingGroup(appt)
  // Ordena pelo id para ter ordem determinística
  group.sort((a, b) => a.id - b.id)
  const totalCols = group.length
  const colIndex  = group.findIndex(a => a.id === appt.id)
  return { colIndex, totalCols }
}

function getCardStyle(appt) {
  const top        = minutesToPx(timeToMinutes(appt.startTime) - START_MIN)
  const naturalH   = minutesToPx(appt.durationMin)
  const minH       = appt.expanded ? 180 : naturalH
  const height     = Math.max(naturalH, minH) - 8

  const { colIndex, totalCols } = getColumnInfo(appt)

  // Divide a largura disponível em totalCols fatias iguais
  const pct        = 100 / totalCols
  const gapTotal   = CARD_PAD * (totalCols + 1)   // gaps entre e nas bordas
  const gapPerCol  = gapTotal / totalCols

  return {
    top:        top + 4 + 'px',
    height:     height + 'px',
    left:       `calc(${pct * colIndex}% + ${CARD_PAD + (colIndex > 0 ? CARD_PAD * colIndex / totalCols : 0)}px)`,
    width:      `calc(${pct}% - ${gapPerCol}px)`,
    zIndex:     appt.expanded ? 20 : colIndex + 1,
    transition: 'height 0.3s ease',
    overflow:   appt.expanded ? 'auto' : 'hidden',
  }
}

// ─── Slot livre ───────────────────────────────────────────────────────────────
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
  return professionals.value.find(p => p.id === id)?.color ?? '#999'
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

function reschedule(appt) {
  alert(`Reagendar: ${appt.client}`)
}

function cancel(appt) {
  if (confirm(`Cancelar agendamento de ${appt.client}?`)) {
    appt.status = 'cancelado'
  }
}
</script>

<style scoped>
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
</style>
