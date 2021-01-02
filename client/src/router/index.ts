import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePage from '../views/HomePage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/test-events',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/TestEventsPage.vue')
  },
  {
    path: '/page_1',
    name: 'Page1',
    // On this page you can see the to do list
    component: () => import('../views/page1/Page1.vue')
  },
  {
    path: '/page_2',
    name: 'Page2',
    // On this page you can see the actual bus plan
    component: () => import('../views/page2/Page2.vue')
  },
  {
    path: '/page_3',
    name: 'Page3',
    // On this page you can see the way to work and traffic information
    component: () => import('../views/page3/Page3.vue')
  },
  {
    path: '/page_4',
    name: 'Page4',
    // On this page you can see the meal plan of the canteen
    component: () => import('../views/page4/Page4.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
