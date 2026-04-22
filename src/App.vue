<script setup>
import NavBottom from '@/components/nav/NavBottom.vue'
import NavAside from '@/components/nav/NavAside.vue'
import NavTop from './components/nav/NavTop.vue';

import { useBreakpoints } from './composables/useBreakpoints';
import { useRoute } from 'vue-router';
import FundoMenu from './components/FundoMenu.vue';
import { useMenuStore } from './stores/useMenuStore';
import FundoModais from './components/FundoModais.vue';
import DeleteService from './components/modals/DeleteService.vue';
import EditService from './components/modals/EditService.vue';
import EditAppointment from './components/modals/EditAppointment.vue';
import NewAppointmentModal from './components/modals/NewAppointmentModal.vue';
import PasswordEdit from './components/modals/PasswordEdit.vue';
import ProfileEdit from './components/modals/ProfileEdit.vue';
import NewEmployee from './components/modals/NewEmployee.vue';
import EmployeeEdit from './components/modals/EmployeeEdit.vue';

const { width } = useBreakpoints()
const menuStore = useMenuStore()
const route = useRoute()



</script>

<template>
  <RouterView/>

  <template v-if="route.path !== '/'">
    <NavBottom v-if="width < 768"></NavBottom>
    <NavAside></NavAside>
    <NavTop v-if="width < 768"></NavTop>
    <FundoMenu v-if="menuStore.isMenuOpen && width < 768"></FundoMenu>
    <!-- <FundoModais></FundoModais> -->
    <!-- <DeleteService></DeleteService> -->

    <!-- <EditAppointment></EditAppointment> -->
    <!-- <NewAppointmentModal></NewAppointmentModal> -->
    <!-- <PasswordEdit></PasswordEdit> -->
    <!-- <ProfileEdit></ProfileEdit> -->
    
  </template>
</template>

<style lang="scss">



</style>
