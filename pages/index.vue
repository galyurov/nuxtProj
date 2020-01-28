<template>
  <section> 
      <choise/>
      <cards/>
      <pagination/>
  </section>
</template>

<script>
import choise from '@/components/choise'
import cards from '@/components/cards'
import pagination from '@/components/pagination'
export default {
  components: {
    choise,
    cards,
    pagination,
  },
  async fetch ({store}) {
    if (store.getters.allCards.length === 0) {
      await  store.dispatch('fetch')
    }
  },
}
</script>

<style>
  section {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>