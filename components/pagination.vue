<template>
  <div class="pagination">
      <div class="pagination_left"><a href="#" v-if="hasPrev()" @click="changePage(-1)">Предыдущая</a></div>
      <div class="pagination_mid">
          <ul>
              <li v-if="hasFirst()"><a href="#"  @click="changePage()">1</a></li>
              <li v-if="hasFirst()">...</li>
              <li v-for="page in pages" :key="page">
                  <a href="#" :class="{ current: dataPages.currentPage == page }" @click="changePage(page - dataPages.currentPage)" >{{ page }}</a>
              </li>
              <li v-if="hasLast()">...</li>
              <li v-if="hasLast()"><a href="#"  @click="changePage(300 - dataPages.currentPage)">{{dataPages.total}}</a></li>
          </ul>
      </div>
      <div class="pagination_right"><a href="#" v-if="hasNext()" @click="changePage(1)">Следующая</a></div>
  </div>
</template>

<script> 

export default {
    computed: {
       dataPages() {
            return this.$store.getters.getPage
        },
        pages: function() {
            let pages = []
            for(let i = this.rangeStart; i <= this.rangeEnd; i++) {
                pages.push(i)
            }
            return pages
        },
        rangeStart: function() {
            let start = this.dataPages.currentPage - this.dataPages.pageRange
            return (start > 0) ? start : 1
        },
        rangeEnd: function() {
            let end = this.dataPages.currentPage + this.dataPages.pageRange
            return (end < this.dataPages.total) ? end : this.dataPages.total
        }
        
        
        
        
         
    },

    methods: {
        changePage(step) {
           this.$store.dispatch('changeCurrentPage',[step]);
           this.$store.dispatch('fetch');
        },
        hasFirst: function(){
            return this.rangeStart !== 1
        },
        hasLast: function(){
            return this.dataPages.currentPage < this.dataPages.total
        },
        hasPrev: function() {
            return this.dataPages.currentPage > 1
        },
        hasNext: function() {
            return this.dataPages.currentPage < this.dataPages.total
        },
        
        


    }

}
</script>

<style lang="scss" scoped>
    .pagination {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        padding: 0 15px;
        margin-bottom: 40px;
        & a, span {
            display: block;
            text-align: center;
            line-height: 42px;
            color:#999;
            font-size: 18px;
        }
    }
    .pagination a {
        background-color: transparent;
        border-radius: 4px;
        padding: 0 20px;
        border: 1px solid #ccc;
        text-decoration: none;
        max-width: 160px;
        margin: 0 6px;
        transition: all .2s ease-in-out;
        &:hover, &.current {
        border-color: #ea4c89;
        color: #ea4c89;
    }
    }
    .pagination_left {
        float: left;
        width: 20%;
        max-width: 160px;
    }
    .pagination_right {
        float: right;
        width: 20%;
        max-width: 160px;
    }
    .pagination_mid {
        display: flex;
        justify-content: center;
        width: 60%;
        & ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        & li {
            display: inline-block;
        }
    }

</style>