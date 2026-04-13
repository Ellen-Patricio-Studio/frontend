<script setup>
import Avatar from '../Avatar.vue';
import imgAvatar from '@/assets/images/logo.jpeg';

defineProps({
    service: String,
    description: String,
    time: String,
    checkStatus: Boolean,
    price: String,
    id: 1, //temporário
    name: String,
    role: String,
})

</script>

<template>
    <label class="new-appointment-list-item" :class="{'checked': checkStatus}" :for="'check'+id">
        <div class="left">
            <Avatar :src="imgAvatar" alt="Foto de perfil" :name="name" :role="role"></Avatar>
        </div>  
        <div class="right">
            <input class="service-check" type="radio"  :name="'check'+id" :id="'check'+id" :checked="checkStatus">

        </div>
    </label>
</template>

<style lang="scss">
    .new-appointment-list-item{
        @include flex (row, space-between, start);
        
    }
</style>