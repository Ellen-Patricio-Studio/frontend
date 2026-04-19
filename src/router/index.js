import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login.vue';
import DashboardAdmin from '@/views/DashboardAdmin.vue';
import Appointments from '@/views/Appointments.vue';
import FinancesAdmin from '@/views/FinancesAdmin.vue';
import TeamsAdmin from '@/views/TeamsAdmin.vue';
import Profile from '@/views/Profile.vue';
import NewAppointment from '@/views/newAppointments/NewAppointment.vue';
import ProfessionalSelection from '@/views/newAppointments/ProfessionalSelection.vue';
import DateSelection from '@/views/newAppointments/DateSelection.vue';
import Confirmation from '@/views/newAppointments/Confirmation.vue';
import ServicesAdmin from '@/views/ServicesAdmin.vue';
import Account from '@/views/Account.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardAdmin
  },
  {
    path: '/agendamentos',
    name: 'agendamentos',
    component: Appointments
  },
  {
    path: '/financas',
    name: 'financas',
    component: FinancesAdmin
  },
  {
    path: '/equipe',
    name: 'equipe',
    component: TeamsAdmin
  },
  {
    path: '/equipe/julia.campos',
    name: 'equipe/julia.campos',
    component: Profile
  },
  {
    path: '/novo-agendamento',
    name: 'novo-agendamento',
    component: NewAppointment
  },
  {
    path: '/novo-agendamento/selecionar-profissional',
    name: 'selecionar-profissional',
    component: ProfessionalSelection
  },
  {
    path: '/novo-agendamento/selecionar-data',
    name: 'selecionar-data',
    component: DateSelection
  },
  {
    path: '/novo-agendamento/resumo',
    name: 'resumo',
    component: Confirmation
  },
  {
    path: '/servicos',
    name: 'servicos',
    component: ServicesAdmin
  },
  {
    path: '/conta',
    name: 'conta',
    component: Account
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
