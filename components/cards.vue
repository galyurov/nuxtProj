<template>
    <div class="container">
        <div class="card" v-for="card in cards" :key="card.id.value" @click="popUp(card)" >
            <img v-bind:src="card.picture.large" alt="" class="img">
            <p class="title">Hi, My name is</p>
            <h2 class="value">{{card.name.first+' '+ card.name.last}}</h2>
            <ul class="listOfIcons"  v-on:mouseover="changeCard">
                <li data-title="Hi, My name is" class="person_name checked" :data-value="card.name.first + ' ' + card.name.last"></li>
                <li data-title="My email adress is" class="person_email" :data-value="card.email"></li>
                <li data-title="My birthday is" class="person_birth" :data-value="editDate(card)"></li>
            </ul>
        </div>
        <div class="load" v-on:click='changeQty(20)'>Загрузить еще</div>
    </div>
</template>

<script>

export default { 
  computed: {
    cards() {
      return this.$store.getters.allCards
    }, 
  },

  methods:  {
    changeQty(value){
            this.$store.dispatch('changeQty',[value])
            this.$store.dispatch('fetch')

    },
    popUp(card){
        alert(`My email is ${card.email} . Gender is ${card.gender}. Age is ${card.dob.age}`)
    },
    changeCard: function (event) {
        if (event.target.tagName === 'LI' ) {
            let allLi = event.target.parentElement.children;
            for( let li of allLi) {
                li.classList.remove('checked');
            }
            event.target.classList.add('checked');
            this.editInfo(event.target);
        }
    },

    editDate: card => {
      let birth = new Date (card.dob.date);
      return birth.toLocaleDateString('en-US')
    },

    editInfo(targetLi) {
      let div = targetLi.parentElement.parentElement;
      for (let elem of div.children) {
        if(elem.className == 'title'){
          elem.textContent = targetLi.dataset.title
        }
        if(elem.className == 'value'){
          elem.textContent = targetLi.dataset.value
        }
      }
    },
  }
}



</script>

<style lang="scss" scoped>

    .container{
      margin: 60px auto;
      margin-top: 0;
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      
    }
    .card {
    &:after{
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 130px;
        top: 0;
        background: #f9f9f9;
        border-bottom: 1px solid rgba(0,0,0,.15);
        z-index: -1;
    }
    width: 730px;
    position: relative;
    border: 1px solid;
    border-radius: 5px;
    margin-bottom: 1rem;
    padding: 20px 0;
    box-shadow: 3px 4px 10px -3px rgba(0,0,0,0.62);
    }
    .img {
    margin-top: 20px;
    margin-bottom: 30px;
    border: 1px solid rgba(0,0,0,.25);
    border-radius: 50%;
    width: 150px;
    border-width: 2px;
    }
    .title{
    font-size: 18px;
    margin: 0;
    color: #999;
    }
    .value {
    margin: 5px;
    font-size: 38px;
    }
    .listOfIcons {
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    li{
      display: block;
      cursor: pointer;
      width: 40px;
      height: 48px;
      background-image: url('https://randomuser.me/img/card_icons.png');
      background-size: 378px;
      transition: all .25s ease-out;
    }
    }
    .person_name{
        background-position: 0 -48px;
        &.checked {
        background-position: 0 -96px;
        }
    }
    .person_email{
        background-position: -68px -48px;
        &.checked {
        background-position: -68px -96px;
        }
    }
    .person_birth{
        background-position: -135px -48px;
        &.checked{
        background-position: -135px -96px;
        }
    }
    
    .load {
        width: 20%;
        border: 1px solid #ccc;
        display: inline-block;
        padding: 10px;
        margin: 0 auto;
        line-height: 42px;
        border-radius: 2px;
        cursor: pointer;
        transition: all .2s ease-in-out;
        &:hover {
                border-color: #ea4c89;
                color: #ea4c89;
        }
    }

</style>
