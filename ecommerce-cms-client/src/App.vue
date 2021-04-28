<template>
  <div id="app">
    <div id="nav">
      <NavbarBeforeLogin v-if="!navbarStatus"/>
      <NavbarAfterLogin v-if="navbarStatus"/>
      <!-- <p>{{ loginState }}</p> -->
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavbarBeforeLogin from './components/NavbarBeforeLogin'
import NavbarAfterLogin from '@/components/NavbarAfterLogin.vue'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
  },
  components: {
    NavbarBeforeLogin,
    NavbarAfterLogin
  },
  computed: {
    navbarStatus () {
      return this.$store.state.navbar
    }
  },
  created () {
    this.$store.dispatch('checkLocalStorage')
  }
}
</script>

<style>
  /* @import './assets/style.css'; */
</style>
