<template>
  <div class="col-lg">
    <div class="card" style="width: 100%;">
      <img :src="banner.banner_url" class="card-img-top img-banner" alt="content">
      <div class="card-body">
        <h5 class="card-title"><i class="fab fa-vuejs"></i> Category {{ banner.category }}</h5>
        <p class="card-text"><i class="fas fa-info-circle"></i> Status {{ banner.status }}</p>
        <div class="d-flex justify-content-around btn-card">
          <p @click.prevent="editBanner(banner.id)"><i class="fas fa-edit"></i> Edit </p>
          <p @click.prevent="deleteBanner(banner.id)"><i class="fas fa-trash-alt"></i> Delete </p>
        </div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'BannerCard',
  props: ['banner'],
  methods: {
    editBanner (id) {
      this.$router.push(`/banners/${id}`)
    },
    deleteBanner (id) {
      this.$store.dispatch('deleteBanner', id)
    }
  }
}
</script>

<style>

</style>
