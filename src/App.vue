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
  const { width } = useBreakpoints()

</script>

<template>
  <NavBottom v-if="width < 768"></NavBottom>
  <NavAside v-if="width >= 768"></NavAside>
  <NavTop v-if="width < 768"></NavTop>
  <!-- <DashboardAdmin></DashboardAdmin> -->
  <!-- <Appointments></Appointments> -->
  <!-- <FinancesAdmin></FinancesAdmin> -->
  <!-- <TeamsAdmin></TeamsAdmin>   -->
  <!-- <Profile></Profile> -->
  <!-- <NewAppointment></NewAppointment> -->
  <!-- <ProfessionalSelection></ProfessionalSelection> -->
</template>

<style lang="scss">



</style>
