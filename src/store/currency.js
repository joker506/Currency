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
    check_currency(state, payload) {
      state.checkCurrency = payload
    },
    history_currency(state, payload) {
      state.historyCurrency = payload
    },
    value_course(state, payload) {
      state.valueСourse = payload.toString()
    },
    list_currency(state, payload) {
      state.listCurrency = payload
    }
  },
  getters: {
    newArr(state) {
      const arr = []
      Object.keys(state.listCurrency).map(listCurrencyItem => {
        const obj = {
          name: listCurrencyItem,
          currencyName: state.listCurrency[listCurrencyItem].currencyName
        }
        arr.push(obj)
      })
      return arr
    }
  },
  actions: {
    setVal({ commit }, payload) {
      return Api.getCourse(payload).then(response => {
        commit('value_course', Object.values(response.data))
      })
    },

    getVal({ commit }) {
      return Api.getVl().then(result => {
        commit('list_currency', result.data.results)
      })
    },
    getHistoryCourse({ commit }, payload) {
      return Api.historyCourse(payload).then(result => {
        commit('history_currency', result.data[Object.keys(result.data)])
      })
    }
  }
}

export default currency
