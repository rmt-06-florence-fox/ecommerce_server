import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/LoginPage.vue'
import Store from '../views/Store.vue'
import Detail from '../views/Detail.vue'
import NotFound from '../views/404'
import MainPage from '../views/MainPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'store',
        name: 'Store',
        component: Store
      },
      {
        path: 'products/:id',
        name: 'Detail',
        component: Detail
      }
    ]
  },
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
