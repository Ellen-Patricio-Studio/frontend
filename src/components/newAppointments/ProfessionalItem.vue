<script setup>
import Avatar from '../Avatar.vue';
import imgAvatar from '@/assets/images/logo.jpeg';

defineProps({
    id: [String, Number],
    name: String,
    role: String,
    checkStatus: Boolean
});
defineEmits(['click']);
</script>

<template>
    <label 
        class="new-appointment-list-item" 
        :class="{'checked': checkStatus}" 
        :for="'check'+id"
        @click="$emit('click')" 
    >
        <div class="left">
            <Avatar :src="imgAvatar" alt="Foto de perfil" :name="name" :role="role"></Avatar>
        </div>  
        <div class="right">
            <input 
                class="service-check" 
                type="radio"  
                :name="'prof-group'" 
                :id="'check'+id" 
                :checked="checkStatus"
            >
        </div>
    </label>
</template>

<style lang="scss">
    .new-appointment-list-item{
        @include flex (row, space-between, start);
        
    }
</style>