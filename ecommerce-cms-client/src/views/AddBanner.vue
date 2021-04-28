<template>
  <section id="add-banner-page" class="img-product setting-add">
      <div class="container-fluid text-landing d-flex justify-content-center">
        <div class="col-lg backlay white-txt">
          <main class="form-signin">
            <form>
              <h1 class="h3 mb-3 fw-normal text-center">Add Banner</h1>
              <label for="bannerUrl">Banner Url</label>
              <input v-model="banner_url" type="url" id="bannerUrl" class="form-control" placeholder="Banner Url" autofocus>
              <label for="category">Category</label>
              <input v-model="category" type="text" id="category-banner" class="form-control" placeholder="Category">
              <p for="status">Status</p>
              <div class="form-check">
                <input v-model="status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Active">
                <label class="form-check-label" for="flexRadioDefault1">
                  Active
                </label>
              </div>
              <div class="form-check">
                <input v-model="status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Inactive">
                <label class="form-check-label" for="flexRadioDefault2">
                  Inactive
                </label>
              </div>
              <div class="mb-3"></div>
              <button @click.prevent="addBanner" class="w-100 btn btn-lg btn-outline-light" type="submit">Add Banner</button>
              <p class="mt-5 mb-3 text-center">&copy; 2021</p>
            </form>
          </main>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'AddBanner',
  data () {
    return {
      banner_url: '',
      category: '',
      status: ''
    }
  },
  methods: {
    addBanner () {
      const data = {
        banner_url: this.banner_url,
        category: this.category,
        status: this.status
      }
      this.$store.dispatch('addBanner', data)
    }
  }

}
</script>

<style>

</style>
