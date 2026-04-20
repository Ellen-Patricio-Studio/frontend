<script setup>
defineProps({
    src: String,
    alt: String,
    name: String,
    role: String,
    hour: String
})

    
</script>

<template>
    <div class="avatar">
        <img v-if="src!==undefined" :src="src" :alt="alt" class="avatar-img">
        <div class="role-area">
            <p class="name">{{name}}</p>
            <p class="role">{{role}}</p>
            <p class="hour">{{hour}}</p>
        </div>
    </div>
</template>

<style lang="scss">
    .avatar{
        @include flex(row, center, center);
        gap: 8px;


    
        .role-area{
            @include flex(column, center, start);
            width: 100%;
            height: 100%;
            color: var(--cinza-nav);
    
            .name{
                font-size: 14px;
                font-weight: bold;
            }

            .role{
                text-transform: lowercase;
            }

            .role::first-letter{
                text-transform: capitalize;
            }

            .role, .hour{
                font-size: 12px;
            }
            
        }
    }
</style>