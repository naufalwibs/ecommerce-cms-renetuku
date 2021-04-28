import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'LoginPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginPage.vue')
  },
  {
    path: '/products',
    name: 'DashboardProducts',
    component: () => import('../views/DashboardProducts.vue'),
    beforeEnter: (to, from, next) => {
      if (to.name !== 'DashboardProducts' && !localStorage.access_token) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/products',
    name: 'AddProduct',
    component: () => import('../views/AddProduct.vue')
  },
  {
    path: '/products/:id',
    name: 'EditProduct',
    component: () => import('../views/EditProduct.vue')
  },
  {
    path: '/banners',
    name: 'DashboardBanners',
    component: () => import('../views/DashboardBanners.vue')
  },
  {
    path: '/banners',
    name: 'AddBanner',
    component: () => import('../views/AddBanner.vue')
  },
  {
    path: '/banners/:id',
    name: 'EditBanner',
    component: () => import('../views/EditBanner.vue')
  },
  {
    path: '/upload',
    name: 'UploadImg',
    component: () => import('../views/UploadImage.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.name !== 'LoginPage' && !localStorage.access_token) {
//     next({ name: 'LoginPage' })
//   } else {
//     next()
//   }
// })

export default router
