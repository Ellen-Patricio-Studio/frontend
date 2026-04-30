<script setup>
defineProps({
    service: String,
    description: String,
    time: String,
    checkStatus: Boolean,
    price: [String, Number], // Aceita string ou número do banco
    id: [String, Number]
})

// Define o evento para o pai capturar
const emit = defineEmits(['click'])
</script>

<template>
    <label 
        class="new-appointment-list-item" 
        :class="{'checked': checkStatus}" 
        :for="'check'+id"
        @click.prevent="$emit('click')" 
    >
        <div class="left">
            <p class="service-title">{{ service }}</p>
            <p class="service-description">{{ description }}</p>
            <p class="service-time">{{ time }}</p>
        </div>  
        <div class="right">
            <input 
                class="service-check" 
                type="checkbox"  
                :name="'check'+id" 
                :id="'check'+id" 
                :checked="checkStatus"
            >
            <p class="service-price">R${{ price }}</p>
        </div>
    </label>
</template>

<style lang="scss">
    .container-newAppointment{
        .new-appointment-list-item{
            @include flex(row, space-between, stretch);
            

            &.checked {
                border: 2px solid var(--rosa-nav);
                background-color: rgba(var(--rosa-rgb), 0.05);
            }

            .service-title{
                font-size: 16px;
                font-weight: 700;
            }
            .service-description, .service-time{
                font-size: 14PX;
            }
            .right{
                @include flex(column, space-between, end);

                .service-price{
                    font-weight: 700;
                    color: var(--rosa-nav);
                }
            }



            @media all and (min-width: 768px){
                min-width: 300px;
                flex: 1 1 calc(33.333% - 16px);
                max-width: calc(33.333% - 16px);
            }
        }
    }
</style>