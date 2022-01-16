import HTTP from '@/api/baseURL'

export default {
  key: '9536afd583213470fc7e',
  getVl() {
    return HTTP().get('currencies?apiKey=' + this.key)
  },
  getCourse(params) {
    return HTTP().get(
      'convert?q=' +
        params.first +
        '_' +
        params.second +
        '&compact=ultra&apiKey=' +
        this.key
    )
  },
  historyCourse(params) {
    return HTTP().get(
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
