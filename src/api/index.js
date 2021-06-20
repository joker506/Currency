import baseURL from '@/api/baseURL'

export default {
  getVl() {
    return baseURL().get('currencies?apiKey=9536afd583213470fc7e')
  },
  getCourse(params) {
    return baseURL().get(
      'convert?q=' +
        params.first +
        '_' +
        params.second +
        '&compact=ultra&apiKey=9536afd583213470fc7e'
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
        '&apiKey=9536afd583213470fc7e'
    )
  }
}
