<script setup>
import Avatar from '../Avatar.vue';
import imgAvatar from '@/assets/images/logo.jpeg'
import { Icon } from '@iconify/vue';

defineProps({
    src: String,
    alt: String,
    name: String,
    role: String,
    hour: String,
    status: String,
    professional: String
})

    
</script>

<template>
    <li class="appointments-list-item">
        <div class="left">
            <p>{{ role }}</p>
            <Avatar :src="imgAvatar" alt="foto de perfil" name="Ellen Patricio" hour="10:00"></Avatar>
            <p class="professional">
                <Icon icon="healthicons:city-worker" class="icon"/>
                <span>{{ professional }}</span>
            </p>
        </div>
        <p>{{ status }}</p>
    </li>
</template>

<style lang="scss">
    .appointments-list-item{
      @include flex(row, space-between, start);
      width: 100%;
      font-size: 14px;
      color: var(--cinza-nav);
      padding: 16px 24px;
      border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: var(--border-radius);

      .left{
        @include flex(column, start, start);
        gap: 8px;

        .professional{
            @include flex(row, start, center);
            gap: 8px;

            .icon{
                width: 16px;
                height: 16px;
            }
        }
      } 

    }
    
</style>