<script setup>
    defineProps({
        title: String,
        description: String,
        subdescription: String,
    })
</script>

<template>
    <div class="information">
        <p class="title">{{ title }}</p>
        <h3 class="description">{{ description }}</h3>
        <p class="subdescription">{{ subdescription }}</p>
    </div>
</template>

<style lang="scss">
    .information{
        width: 100%;
        @include flex(column, center, start);
        gap: 12px;
        color: var(--cinza-nav);

        .title{
            font-weight: 700;
        }

        .description{
            color: var(--preto-comprovante);
            line-height: 0;
        }
    }
</style>
