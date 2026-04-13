<script setup>

defineProps({
    service: String,
    description: String,
    time: String,
    checkStatus: Boolean,
    price: String,
    id: 1 //temporário
})

</script>

<template>
    <label class="new-appointment-list-item" :class="{'checked': checkStatus}" :for="'check'+id">
        <div class="left">
            <p class="service-title">{{ service }}</p>
            <p class="service-description">{{ description }}</p>
            <p class="service-time">{{ time }}</p>
        </div>  
        <div class="right">
            <input class="service-check" type="checkbox"  :name="'check'+id" :id="'check'+id" :checked="checkStatus">
            <p class="service-price">R${{ price }},00</p>
        </div>
    </label>
</template>

<style lang="scss">
    .container-newAppointment{
        .new-appointment-list-item{
            @include flex(row, space-between, stretch);

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