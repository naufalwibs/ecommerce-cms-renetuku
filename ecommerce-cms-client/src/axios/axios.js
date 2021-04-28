import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://renetuku-ecommerce-cms-nw.herokuapp.com/'
})

export default instance
