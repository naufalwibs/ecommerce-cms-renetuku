<template>
  <section id="upload-page" class="img-product">
      <div class="container-fluid text-landing backlay-dashboard scrollable">
        <UploadImageComp/>
    </div>
  </section>
</template>

<script>
import UploadImageComp from '../components/UploadImageComp'

export default {
  name: 'DashboardBanner',
  components: {
    UploadImageComp
  }
}
</script>

<style>

</style>
