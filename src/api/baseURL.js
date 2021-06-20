import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://free.currconv.com/api/v7/'
  })
}
