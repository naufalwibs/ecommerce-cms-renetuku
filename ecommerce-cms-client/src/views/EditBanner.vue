<template>
  <section id="edit-banner-page" class="img-product">
      <div class="container-fluid text-landing d-flex justify-content-center">
        <div class="col-lg backlay white-txt">
          <main class="form-signin">
            <form>
              <h1 class="h3 mb-3 fw-normal text-center">Edit Banner</h1>
              <label for="bannerUrl">Banner Url</label>
              <input v-model="currentBanner.banner_url" type="url" id="bannerUrl" class="form-control" placeholder="Banner Url" autofocus>
              <label for="category">Category</label>
              <input v-model="currentBanner.category" type="text" id="category-banner" class="form-control" placeholder="Category">
              <p for="status">Status</p>
              <div class="form-check">
                <input v-if="currentBanner.status === 'Active'" v-model="currentBanner.status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Active" checked>
                <input v-if="currentBanner.status === 'Inactive'" v-model="currentBanner.status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Active">
                <label class="form-check-label" for="flexRadioDefault1">
                  Active
                </label>
              </div>
              <div class="form-check">
                <input v-if="currentBanner.status === 'Inactive'" v-model="currentBanner.status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Inactive" checked>
                <input v-if="currentBanner.status === 'Active'" v-model="currentBanner.status" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Inactive">
                <label class="form-check-label" for="flexRadioDefault2">
                  Inactive
                </label>
              </div>
              <div class="mb-3"></div>
              <button @click.prevent="editBanner(currentBanner.id)" class="w-100 btn btn-lg btn-outline-light" type="submit">Edit Banner</button>
              <p class="mt-5 mb-3 text-center">&copy; 2021</p>
            </form>
          </main>
        </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'EditBanner',
  data () {
    return {
    }
  },
  methods: {
    editBanner (id) {
      console.log('yeah editbanner')
      const { bannerUrl, category, status } = {
        bannerUrl: this.currentBanner.banner_url,
        category: this.currentBanner.category,
        status: this.currentBanner.status
      }
      this.$store.dispatch('editBanner', { id, banner_url: bannerUrl, category, status })
    },
    fetchBannerById () {
      const id = this.$route.params.id
      this.$store.dispatch('fetchBannerById', id)
    }
  },
  computed: {
    currentBanner () {
      return this.$store.state.banner
    }
  },
  created () {
    this.fetchBannerById()
  }

}
</script>

<style>

</style>
