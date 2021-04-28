<template>
  <nav id="nav-after-login" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="../assets/renetuku-nav-logo.png" alt="" width="150" class="d-inline-block align-top brand-radius">
            </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a @click.prevent="toProducts" class="nav-link active" aria-current="page" href="#"><i class="fas fa-home"></i> Dashboard</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="toAddProduct" class="nav-link" href="#"><i class="fas fa-plus-square"></i> Add Product</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="toBanners" class="nav-link" href="#"><i class="fas fa-map"></i> Banner</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="toAddBanner" class="nav-link" href="#"><i class="fas fa-plus-square"></i> Add Banner</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="toUpload" class="nav-link" href="#"> ⬆ Upload</a>
                </li>
                <li class="nav-item">
                    <a @click.prevent="logoutBtn" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </li>
            </ul>
        </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavbarAfterLogin',
  methods: {
    logoutBtn () {
      this.$store.dispatch('logoutCurrentUser')
    },
    toBanners () {
      this.$router.push('/banners')
    },
    toProducts () {
      this.$router.push('/products')
    },
    toAddProduct () {
      this.$router.push({ name: 'AddProduct' })
    },
    toAddBanner () {
      this.$router.push({ name: 'AddBanner' })
    },
    toUpload () {
      this.$router.push('/upload')
    }
  }
}
</script>

<style>

</style>
