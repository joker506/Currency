import baseURL from '@/api/baseURL'

export default {
  key: '9536afd583213470fc7e',
  getVl() {
    return baseURL().get('currencies?apiKey=' + this.key)
  },
  getCourse(params) {
    return baseURL().get(
      'convert?q=' +
        params.first +
        '_' +
        params.second +
        '&compact=ultra&apiKey=' +
        this.key
    )
  },
  historyCourse(params) {
    return baseURL().get(
      'convert?q=' +
        params.first +
        '_' +
        params.second +
        '&compact=ultra&date=' +
        params.date +
        '&apiKey=' +
        this.key
    )
  }
}
