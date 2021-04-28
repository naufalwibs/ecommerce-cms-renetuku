<template>
  <section id="banner-page" class="img-product">
      <div class="container-fluid text-landing backlay-dashboard scrollable">
        <h2 class="white-txt text-center margin-db-title">Dashboard Banners</h2>
        <BannerCard
        v-for="banner in banners"
        :key="banner.id"
        :banner="banner"
        />
    </div>
  </section>
</template>

<script>
import BannerCard from '../components/BannerCard'
import { mapState } from 'vuex'

export default {
  name: 'DashboardBanner',
  components: {
    BannerCard
  },
  methods: {
    fetchAllBanner () {
      this.$store.dispatch('fetchAllBanner')
    }
  },
  computed: {
    ...mapState(['banners'])
  },
  created () {
    this.fetchAllBanner()
  },
  updated () {
    this.fetchAllBanner()
  }

}
</script>

<style>

</style>
