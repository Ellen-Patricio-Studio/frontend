<script setup>
defineProps({
    src: String,
    alt: String,
    name: String,
    role: String
})

    
</script>

<template>
    <div class="avatar">
        <img :src="src" :alt="alt">
        <div class="role-area">
            <p class="name">{{name}}</p>
            <p class="role">{{role}}</p>
        </div>
    </div>
</template>

<style lang="scss">
    .avatar{
        @include flex(row, center, center);
        gap: 8px;

        img{
            width: 40px;
            height: 40px;
            border-radius: 999px;
        }
    
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
                font-size: 12px;
            }
            
        }
    }
</style>