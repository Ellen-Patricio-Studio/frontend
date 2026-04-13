<script setup>




</script>

<template>
    <div class="container-DateSelection">
        <div class="box">
            
        </div>
    </div>
</template>

<style lang="scss">
    .container-professionalSelection{
        padding: 16px 24px;
        margin: calc(80px + 16px) 0;
        transition: 1s;
        font-size: 14px;

        .box{
            width: 100%;
            @include flex(column, center, start);
            gap: 32px;
            padding-top: 32px;
            padding-bottom: 32px;

            .confirmation{
                .selection{
                    @include flex(column, center, start);

                    .title{
                        font-size: 12px;
                        color: var(--cinza-nav);
                    }
                }
            }
        }   

        @media all and (min-width: 768px){
            padding-left: calc(256px + 32px);

            .confirmation{

            }
        }
    }
</style>