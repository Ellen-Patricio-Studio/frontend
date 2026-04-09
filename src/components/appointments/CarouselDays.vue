<script setup>
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { format, addDays, startOfToday, eachDayOfInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Importante para vir "Seg", "Ter"...


const dias = ref([]);
const hoje = startOfToday();
const diasParaExibir = 30; // Quantos dias mostrar no carrossel
const diaSelecionado = ref(format(hoje, 'yyyy-MM-dd')); // ID único para o active

onMounted(() => {
  // Gera um array com os próximos X dias a partir de hoje
  const intervalo = eachDayOfInterval({
    start: hoje,
    end: addDays(hoje, diasParaExibir - 1)
  });

  dias.value = intervalo.map(data => {
    return {
      id: format(data, 'yyyy-MM-dd'),
      nomeDia: format(data, 'EEE', { locale: ptBR }).replace('.', ''), // "seg", "ter"
      numero: format(data, 'd'), // "1", "2"
      isHoje: format(data, 'yyyy-MM-dd') === format(hoje, 'yyyy-MM-dd')
    };
  });
});

const selecionarDia = (id) => {
  diaSelecionado.value = id;
};

const scrollContainer = ref(null);

const moverScroll = (direcao) => {
  if (scrollContainer.value) {
    // 64px (largura da bolinha) + 16px (gap) = 80px
    const larguraItem = 80; 
    
    scrollContainer.value.scrollBy({
      left: direcao === 'proximo' ? larguraItem : -larguraItem,
      behavior: 'smooth' // Faz o movimento deslizar suavemente
    });
  }
};


</script>

<template>
    <div class="carousel">
        <Icon icon="mingcute:left-fill" class="icon" @click="moverScroll('anterior')"/>
        <div class="circles" ref="scrollContainer">
            <div class="circle" v-for="dia in dias" :key="dia.id" :class="{active: diaSelecionado === dia.id}" @click="selecionarDia(dia.id)"">
                <p>{{dia.isHoje ? 'Hoje' : dia.nomeDia}}</p>
                <p>{{dia.numero}}</p>
            </div>
        </div>
        <Icon icon="mingcute:right-fill" class="icon" @click="moverScroll('proximo')"/>
    </div>
</template>

<style lang="scss">
    .carousel{
        width: 100%;
        @include flex(row, space-between, center);
        gap: 16px;
        
        .circles{
            overflow-x: auto;
            gap: 16px;
            @include flex(row, start, center);
            flex: 1;

            .circle{
                flex-shrink: 0;
                width: 64px;
                height: 64px;
                background-color: #dfdfdf;
                border-radius: 12px;
                @include flex(column, center, center);
    
                p{
                    font-size: 12px;
                    color: var(--cinza-nav);   
                    font-weight: 300;
                }
    
                &.active{
                    background-color: mediumslateblue;
    
                    p{
                        color: white;
                    }
                }
            }

            &::-webkit-scrollbar {
                display: none;
            }
            -ms-overflow-style: none; 
            scrollbar-width: none;
        }


        .icon{
            color: var(--cinza-nav);
            width: 24px;
            height: 24px;
            cursor: pointer;
        }
    }
</style>
