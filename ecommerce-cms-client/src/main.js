import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'
import './assets/style.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import firebase from 'firebase'

Vue.config.productionTip = false
Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyDTN-b-vggGzXeUSc1NLqSA_-ket-UGdRM',
      authDomain: 'renetuku-ecommerce-cms.firebaseapp.com',
      projectId: 'renetuku-ecommerce-cms',
      storageBucket: 'renetuku-ecommerce-cms.appspot.com',
      messagingSenderId: '824771512634',
      appId: '1:824771512634:web:60f35a104a88da16c0a803'
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  }
}).$mount('#app')
