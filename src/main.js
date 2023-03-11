import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';

const config = import(`@/config/${process.env.NODE_ENV}`).then(module => module.default);

axios.defaults.baseURL = config.baseURL

createApp(App).mount('#app')
