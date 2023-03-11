import axios from 'axios';
import development from '@/config/development'
import production from '@/config/production'

// const instance = axios.create({
//   baseURL: 'http://localhost:8080/api'
// });

const instance = (process.env.NODE_ENV == 'production') ? axios.create(production) : axios.create(development)
console.log(process.env.NODE_ENV)

export default instance;