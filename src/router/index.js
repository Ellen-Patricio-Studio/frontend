import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore';
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
import ClientesAdmin from '@/views/ClientesAdmin.vue';
import ClienteProfile from '@/views/ClienteProfile.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardAdmin,
    meta: { requiresAuth: true, role: ['ADMIN', 'FUNCIONARIO', 'CLIENTE']}
  },
  {
    path: '/agendamentos',
    name: 'agendamentos',
    component: Appointments,
    meta: { requiresAuth: true, role: ['ADMIN', 'FUNCIONARIO', 'CLIENTE']}
  },
  {
    path: '/financas',
    name: 'financas',
    component: FinancesAdmin,
    meta: { requiresAuth: true, role: ['ADMIN']}
  },
  {
    path: '/equipe',
    name: 'equipe',
    component: TeamsAdmin,
    meta: { requiresAuth: true, role: ['ADMIN']}
  },
  {
    path: '/equipe/:id',
    name: 'equipe/funcionario',
    component: () => import('@/views/Profile.vue'),
    props: true,
    meta: { requiresAuth: true, role: ['ADMIN']}
  },
  {
    path: '/novo-agendamento',
    name: 'novo-agendamento',
    component: NewAppointment,
    meta: { requiresAuth: true, role: ['ADMIN', 'CLIENTE']}
  },
  {
    path: '/novo-agendamento/selecionar-profissional',
    name: 'selecionar-profissional',
    component: ProfessionalSelection,
    meta: { requiresAuth: true, role: ['ADMIN', 'CLIENTE']}
  },
  {
    path: '/novo-agendamento/selecionar-data',
    name: 'selecionar-data',
    component: DateSelection,
    meta: { requiresAuth: true, role: ['ADMIN', 'CLIENTE']}
  },
  {
    path: '/novo-agendamento/resumo',
    name: 'resumo',
    component: Confirmation,
    meta: { requiresAuth: true, role: ['ADMIN', 'CLIENTE']}
  },
  {
    path: '/servicos',
    name: 'servicos',
    component: ServicesAdmin,
    meta: { requiresAuth: true, role: ['ADMIN']}
  },
  {
    path: '/conta',
    name: 'conta',
    component: Account,
    meta: { requiresAuth: true, role: ['ADMIN', 'FUNCIONARIO', 'CLIENTE']}
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: ClientesAdmin,
    meta: { requiresAuth: true, role: ['ADMIN']}  
  },
  {
    path: '/clientes/:id',
    name: 'cliente-perfil',
    component: ClienteProfile,
    meta: { requiresAuth: true, role: ['ADMIN']}  
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  
  // Pegue o token direto do localStorage se a store ainda estiver "acordando"
  const token = auth.token || localStorage.getItem('access_token')
  const isAuthenticated = !!token

  // 1. Visitante logado tentando ir pro Login
  if (to.meta.requiresGuest && isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  // 2. Rota protegida e usuário não logado
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }

  // 3. Usuário logado mas sem os dados do perfil (ocorre no refresh ou logo após login)
  if (isAuthenticated && !auth.user && to.name !== 'login') {
    try {
      await auth.carregarPerfil()
      // Após carregar o perfil, as roles estarão disponíveis para a próxima checagem
    } catch (error) {
      auth.logout()
      return next({ name: 'login' })
    }
  }

  // 4. Validação de Roles (O ponto crítico)
  if (to.meta.role) {
    // Importante: use o getter 'roles' que limpa os espaços (conforme vimos na imagem do banco)
    const userRoles = auth.roles 
    const hasPermission = to.meta.role.some(r => userRoles.includes(r))
    
    if (!hasPermission) {
      console.warn("Acesso negado: Usuário não tem a role necessária")
      return next({ name: 'dashboard' }) 
    }
  }

  next()
})

export default router
