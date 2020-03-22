import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/About.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/About.vue')
  },
  {
    path: '/merchant/:id',
    name: 'Merchant',
    props: true,
    component: () => import('../views/MerchantOverview.vue')
  },
  {
    path: '/merchant/:id/transactions',
    name: 'Transactions',
    component: () => import('../views/About.vue')
  },
  {
    path: '/order/:id',
    name: 'Order',
    props: true,
    component: () => import('../views/Order.vue')
  },
  {
    path: '/transactions',
    name: 'Order',
    props: true,
    component: () => import('../views/OrderOverview.vue')
  },
  {
    path: '/order/request',
    name: 'Request',
    component: () => import('../views/About.vue')
  },
  {
    path: '*',
    name: 'Not Found',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
