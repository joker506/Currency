import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ListCurrency',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/ListCurrency.vue')
  },
  {
    path: '/convertor',
    name: 'convertor',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Convertor.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
