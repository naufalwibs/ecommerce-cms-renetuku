import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: [],
    products: [],
    product: {},
    banners: [],
    banner: {},
    navbar: false
  },
  mutations: {
    setCurrentUser (state, payload) {
      state.currentUser = payload
    },
    setAllProduct (state, payload) {
      state.products = payload
    },
    setCurrentProduct (state, payload) {
      state.product = payload
    },
    setAllBanner (state, payload) {
      state.banners = payload
    },
    setCurrentBanner (state, payload) {
      state.banner = payload
    },
    setNavbar (state, payload) {
      state.navbar = payload
    }
  },
  actions: {
    loginCurrentUser (context, payload) {
      axios
        .post('/login', {
          email: payload.email,
          password: payload.password
        })
        .then(response => {
          context.commit('setCurrentUser', { data: response.data })
          context.commit('setNavbar', true)
          localStorage.setItem('id', response.data.id)
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('role', response.data.role)
          localStorage.setItem('access_token', response.data.access_token)
          router.push('/products')
          this._vm.$swal({
            icon: 'success',
            title: 'Login Success',
            text: `Hello ${localStorage.email.split('@')[0]}!`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
        })
        .catch(err => {
          router.push({ name: 'LoginPage' })
          this._vm.$swal({
            icon: 'error',
            title: 'Login Failed',
            text: `${err.response.data.message}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
        })
    },
    logoutCurrentUser (context) {
      this._vm.$swal({
        icon: 'success',
        title: 'Logout Success',
        text: `Good work ${localStorage.email.split('@')[0]}! See you soon.`,
        footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
      })
      context.commit('setNavbar', false)
      localStorage.removeItem('id')
      localStorage.removeItem('email')
      localStorage.removeItem('role')
      localStorage.removeItem('access_token')
      context.commit('setCurrentUser', [])
      router.push('/')
    },
    fetchAllProduct (context) {
      axios
        .get('/products', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          context.commit('setAllProduct', response.data.products)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchProductById (context, payload) {
      axios
        .get(`/products/${payload}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          context.commit('setCurrentProduct', response.data.product)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      axios
        .post('/products', {
          name: payload.name,
          category: payload.category,
          stock: payload.stock,
          price: payload.price,
          image_url: payload.image_url
        }, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          this._vm.$swal({
            icon: 'success',
            title: 'Success',
            text: `${response.data.message}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
          router.push('/products')
        })
        .catch(err => {
          this._vm.$swal({
            icon: 'error',
            title: 'Failed',
            text: `${err.response.data.detail}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
          // this._vm.$swal(
          //   `🅧 ${err.response.data.detail.join('\n 🅧 ')}`
          // )
        })
    },
    editProduct (context, payload) {
      axios
        .put(`/products/${payload.id}`, {
          name: payload.name,
          category: payload.category,
          stock: payload.stock,
          price: payload.price,
          image_url: payload.image_url
        }, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          this._vm.$swal({
            icon: 'success',
            title: 'Success',
            text: `${response.data.message}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
          router.push('/products')
        })
        .catch(err => {
          this._vm.$swal({
            icon: 'error',
            title: 'Failed',
            text: `${err.response.data.detail}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
        })
    },
    deleteProduct (context, payload) {
      this._vm.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`/products/${payload}`, {
              headers: {
                access_token: localStorage.access_token
              }
            })
            .then(response => {
              this._vm.$swal(
                'Deleted!',
                `${response.data.message}`,
                'success'
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    fetchAllBanner (context, payload) {
      axios
        .get('/banners', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          context.commit('setAllBanner', response.data.banners)
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchBannerById (context, payload) {
      axios
        .get(`/banners/${payload}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          context.commit('setCurrentBanner', response.data.banner)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addBanner (context, payload) {
      axios
        .post('/banners', payload, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          this._vm.$swal({
            icon: 'success',
            title: 'Success',
            text: `${response.data.message}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
          router.push('/banners')
        })
        .catch(err => {
          this._vm.$swal({
            icon: 'error',
            title: 'Failed',
            text: `${err.response.data.detail}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
        })
    },
    editBanner (context, payload) {
      axios
        .put(`/banners/${payload.id}`, {
          banner_url: payload.banner_url,
          category: payload.category,
          status: payload.status
        }, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(response => {
          this._vm.$swal({
            icon: 'success',
            title: 'Success',
            text: `${response.data.message}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
          router.push('/banners')
        })
        .catch(err => {
          this._vm.$swal({
            icon: 'error',
            title: 'Failed',
            text: `${err.response.data.detail}`,
            footer: '<p><i class="fas fa-store"></i> Powered by Heroku and Firebase.</p>'
          })
        })
    },
    deleteBanner (context, payload) {
      this._vm.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`/banners/${payload}`, {
              headers: {
                access_token: localStorage.access_token
              }
            })
            .then(response => {
              this._vm.$swal(
                'Deleted!',
                `${response.data.message}`,
                'success'
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    checkLocalStorage (context) {
      if (localStorage.access_token) {
        context.commit('setNavbar', true)
        router.push('/products')
      } else {
        router.push('/')
      }
    }
  },
  modules: {
  }
})
