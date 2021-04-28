<template>
  <section id="login-page" class="img-landing">
    <!-- <img class="idx-img" src="../assets/renetuku-bg-adm.png" alt="bg-img"> -->
    <div class="container-fluid text-landing d-flex justify-content-center">
       <div class="col-lg backlay">
          <main class="form-signin mid-image">
              <img src="../assets/renetuku-logo.png" alt="renetuku" width="200px">
              <form>
                <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
                <label for="inputEmail" class="d-none">Email address</label>
                <input v-model="email" type="email" id="email-login" class="form-control" placeholder="Email address" autofocus>
                <label for="inputPassword" class="d-none">Password</label>
                <input v-model="password" type="password" id="password-login" class="form-control" placeholder="Password">
                <div class="checkbox mb-3">
                  <label>
                    <input type="checkbox" value="remember-me"> Remember me
                  </label>
                </div>
                <button @click.prevent="loginCheck" class="w-100 btn btn-lg btn-outline-light" type="submit">Sign in</button>
                <p class="mt-5 mb-3 text-center">&copy; 2021</p>
              </form>
          </main>
        </div>
    </div>
    </section>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    loginCheck () {
      this.$store.dispatch('loginCurrentUser', { email: this.email, password: this.password })
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
