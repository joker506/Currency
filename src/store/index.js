import Vue from 'vue'
import Vuex from 'vuex'
import currency from '@/store/currency'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currency
  }
})
