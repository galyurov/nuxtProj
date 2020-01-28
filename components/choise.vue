<template>
  <div class="header">
      <p class="qty">Количество элементов на странице</p>
      <input type="number" required :value="10" name="qty" id="qty" min=1 max=20 v-on:change='changeQty'>    
      <input type="radio"  checked name="gender" value="all" id="any" v-on:click="filterCards" >
      <label for="any">Any</label>
      <input type="radio" value="male" name="gender" id="man" v-on:click="filterCards">
      <label for="man">Man</label>
      <input type="radio" value="female" name="gender" id="woman" v-on:click="filterCards">
      <label for="woman">Woman</label>
    </div>
</template>

<script>

export default { 
    methods: {
        changeQty(event){
            this.$store.dispatch('changeQty',[event.target.value])
            this.$store.dispatch('fetch')
        },
        filterCards(event) {
            this.$store.dispatch('filter',[event.target.value]);
        },
    },
   
}
</script>

<style lang='scss' scoped>

.header{
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    margin: 20px;
    input {
        margin-left: 10px;
        cursor: pointer;
    }
    #qty{
        margin: 5px 10px;
        width:40px;
        &:invalid {
            border: 2px dashed red;
        }
    }
    label {
        margin: 2px;
        cursor: pointer;
    }
}
</style>
