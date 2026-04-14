<script setup>
  import NavBottom from '@/components/nav/NavBottom.vue'
  import NavAside from '@/components/nav/NavAside.vue'
  import NavTop from './components/nav/NavTop.vue';
  import { useBreakpoints } from './composables/useBreakpoints';
import BoxInfo from './components/BoxInfo.vue';
import DashboardAdmin from './views/DashboardAdmin.vue';
import Appointments from './views/Appointments.vue';
import FinancesAdmin from './views/FinancesAdmin.vue';
import TeamsAdmin from './views/TeamsAdmin.vue';
import Profile from './views/Profile.vue';
import NewAppointment from './views/newAppointments/NewAppointment.vue';
import ProfessionalSelection from './views/newAppointments/ProfessionalSelection.vue';
import DateSelection from './views/newAppointments/DateSelection.vue';
import Confirmation from './views/newAppointments/Confirmation.vue';
import Login from './views/Login.vue';
  const { width } = useBreakpoints()

</script>

<template>
  <Login></Login>
  <!-- <NavBottom v-if="width < 768"></NavBottom> -->
  <!-- <NavAside v-if="width >= 768"></NavAside> -->
  <!-- <NavTop v-if="width < 768"></NavTop> -->
  <!-- <DashboardAdmin></DashboardAdmin> -->
  <!-- <Appointments></Appointments> -->
  <!-- <FinancesAdmin></FinancesAdmin> -->
  <!-- <TeamsAdmin></TeamsAdmin>   -->
  <!-- <Profile></Profile> -->
  <!-- <NewAppointment></NewAppointment> -->
  <!-- <ProfessionalSelection></ProfessionalSelection> -->
  <!-- <DateSelection></DateSelection> -->
  <!-- <Confirmation></Confirmation>   -->
</template>

<style lang="scss">



</style>
