// import Vue from 'vue'
import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../components/Home.vue'
import About from '../components/About.vue'

// Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router