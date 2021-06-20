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
    // GET_CURRENCY(state, paylod) {
    //   state.currency = paylod
    // },
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
      //console.log(state.listCurrency)
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
    // getListCurrency(state) {
    //   //return (state.correct = Object.entries(state.currency.Valute))
    //   let _arr = []
    //   Object.entries(state.currency).map(e => {
    //     _arr.push(e[0])
    //     return _arr
    //   })
    //   state.correct = _arr
    // },
    // getSelectParam(state) {
    //   let _arr = []
    //   Object.entries(state.currency).forEach(element => {
    //     if (element.includes(state.checkCurrency)) {
    //       return _arr.push(element[1])
    //     }
    //   })
    //   return _arr
    // }
  },
  actions: {
    setVal({ commit }, payload) {
      //console.log(payload)
      return Api.getCourse(payload).then(response => {
        //console.log(response.data)
        commit('VALUE_COURSE', Object.values(response.data))
      })
    },

    // async getCurrency({ commit }) {
    //   return await axios
    //     .get('https://www.cbr-xml-daily.ru/daily_json.js')
    //     .then(result => {
    //       console.log(result.data.Valute)
    //       commit('GET_CURRENCY', result.data.Valute)
    //     })
    // },
    // async getVal({ commit }) {
    //   return await axios
    //     .get(
    //       // 'https://free.currconv.com/api/v7/convert?q=USD_PHP,PHP_USD&compact=ultra&apiKey=9536afd583213470fc7e'
    //       'https://free.currconv.com/api/v7/currencies?apiKey=9536afd583213470fc7e'
    //     )
    //     .then(result => {
    //       console.log(result.data.results)
    //       commit('LIST_CURRENCY', result.data.results)
    //     })
    // }
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
