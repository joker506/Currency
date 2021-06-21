//import axios from 'axios'
import Api from '@/api'

const currency = {
  namespaced: true,

  state: {
    checkCurrency: 'RUB',
    secondCurrency: '',
    valueСourse: '',
    historyCurrency: '',
    currency: [],
    correct: [],
    listCurrency: []
  },
  mutations: {
    CHECK_CURRENCY(state, payload) {
      state.checkCurrency = payload
    },
    HISTORY_CURRENCY(state, payload) {
      console.log(payload)
      state.historyCurrency = payload
    },
    VALUE_COURSE(state, payload) {
      console.log(payload)
      state.valueСourse = payload
    },
    LIST_CURRENCY(state, payload) {
      state.listCurrency = payload
    }
  },
  getters: {
    newArr(state) {
      let _arr = []
      Object.keys(state.listCurrency).map(e => {
        let _obj = {}
        _obj.name = e
        _obj.currencyName = state.listCurrency[e].currencyName
        // _obj.value = state.listCurrency[e]
        _arr.push(_obj)
      })
      return _arr
    }
  },
  actions: {
    setVal({ commit }, payload) {
      //console.log(payload)
      return Api.getCourse(payload).then(response => {
        //console.log(response.data)
        commit('VALUE_COURSE', Object.values(response.data))
      })
    },

    getVal({ commit }) {
      return Api.getVl().then(result => {
        //console.log(result.data.results)
        commit('LIST_CURRENCY', result.data.results)
      })
    },
    getHistoryCourse({ commit }, payload) {
      //console.log(payload)
      return Api.historyCourse(payload).then(result => {
        commit('HISTORY_CURRENCY', result.data[Object.keys(result.data)])
      })
    }
  }
}

export default currency
