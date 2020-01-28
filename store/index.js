export const state = () => ({
    cards:[],
    filteredCards:[],
    pages: {
        total: 300,
        currentPage:1,
        qty: 10,
        pageRange:2
    }
})

export const mutations = {
    updateCards(state, cards) {
        state.cards = state.filteredCards = cards
    },
    filterByGender(state,value){ 
        if( value === 'all') {
            state.filteredCards = state.cards
            return
        }
        state.filteredCards = state.cards.filter(card => card.gender==value) 
    },
    editCurrentPage(state,step) {
        if (step == undefined) {
            state.pages.currentPage = 1
        } else {
            state.pages.currentPage+= step 
        }
    },
    editQty(state,value) {
        if(state.pages.qty <=20 && value<=20) {
            state.pages.qty = value
        }
    }
}

export const actions = {
    async fetch({commit}) {
        let obj = (this.state.pages)
        const res = await this.$axios.$get(`https://randomuser.me/api/?page=${obj.currentPage}&results=${obj.qty}&seed=abc`)
        commit('updateCards',res.results)
    },
    changeCurrentPage({commit}, step) {
        commit('editCurrentPage', step[0])
    },
    filter({commit},value) {
        commit('filterByGender', value[0])
    },
    changeQty({commit}, value) {
        commit('editQty', value[0])
    }
}


export const getters = {
    allCards(state) {
        return state.filteredCards
    },
    getPage(state){
        return state.pages
    }
}
