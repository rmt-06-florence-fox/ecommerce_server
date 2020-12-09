import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../config/axiosInstance'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Tadika Mesra',
    allProducts: []
  },
  mutations: {
    setAllProducts (state, payload) {
      state.allProducts = payload
    }
  },
  actions: {
    fetchData (context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(response => {
          const data = response.data.data
          // this.allProducts = data
          // console.log(this.allProducts)
          context.commit('setAllProducts', data)
        })
    },
    getProductById (context, id) {
      return axios({
        method: 'GET',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
    }
  },
  modules: {
  }
})
