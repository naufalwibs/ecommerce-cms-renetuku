<template>
  <section id="product-page" class="img-product">
        <div class="container-fluid text-landing backlay-dashboard scrollable">
            <h2 class="white-txt text-center margin-db-title">Dashboard Products</h2>
            <div class="col-lg">
              <input type="text"
              class="form-control"
              placeholder="Search products here..."
              v-model="search">
            </div>
            <!-- <div class="d-flex justify-content-center"> -->
              <div class="col-sm row justify-content-lg-start align-items-start margin-fix-dbp justify-content-sm-center">
                <ProductCard class="col-lg-3"
                v-for="product in filteredProduct"
                :key="product.id"
                :product="product"
                />
              </div>
            <!-- </div> -->
        </div>
    </section>
</template>

<script>
import ProductCard from '../components/ProductCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'DashboardProducts',
  data () {
    return {
      search: ''
    }
  },
  components: {
    ProductCard
  },
  methods: {
    fetchAllProduct () {
      this.$store.dispatch('fetchAllProduct')
    }
  },
  computed: {
    ...mapState(['products']),
    filteredProduct () {
      return this.$store.state.products.filter((product) => product.name.toLowerCase().includes(this.search.toLowerCase()))
    }
  },
  created () {
    this.fetchAllProduct()
  },
  updated () {
    this.fetchAllProduct()
  }
}
</script>

<style>

</style>
