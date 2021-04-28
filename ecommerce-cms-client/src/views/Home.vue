<template>
  <div class="home">
    <section id="landing-page" class="img-landing">
        <!-- <img class="idx-img" src="../assets/renetuku-bg-adm.png" alt="bg-img"> -->
        <div class="container-fluid text-landing">
                <div class="col-lg-6 backlay-front">
                    <h1> Renetuku </h1>
                    <h3> Best Choice, Best Price </h3>
                    <p>
                        Renetuku, also known as electronic commerce or internet commerce, refers to the buying and selling of goods or services using the internet, and the transfer of money and data to execute these transactions.
                    </p>
                    <div class="col-lg d-flex justify-content-left">
                        <button @click.prevent="toLoginPage" type="button" class="btn btn-dark btn-lg"><i class="fas fa-sign-in-alt"></i> Login </button>
                    </div>
                </div>
                <div class="col-lg-6">
                </div>
        </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  methods: {
    toLoginPage () {
      this.$router.push({ name: 'LoginPage' })
    }
  }
}
</script>
