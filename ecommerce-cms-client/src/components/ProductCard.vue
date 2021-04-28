<template>
  <div class="card" style="width: 17rem;">
    <img :src="product.image_url" class="card-img-top card-height-max" alt="content">
      <div class="card-body">
        <h5 class="card-title"> {{ product.name }} </h5>
        <p class="card-text"><i class="fab fa-vuejs"></i> Category {{ product.category }} </p>
        <p class="card-text"><i class="fas fa-cubes"></i> Stock {{ product.stock }}</p>
        <p class="card-text"><i class="fas fa-tag"></i> Price {{ priceRupiah }}</p>
        <div class="d-flex justify-content-around btn-card">
          <p @click.prevent="editProduct(product.id)" class="btn btn-dark"><i class="fas fa-edit"></i> Edit</p>
          <p @click.prevent="deleteProduct(product.id)" class="btn btn-outline-dark"><i class="fas fa-trash-alt"></i> Delete</p>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  methods: {
    editProduct (id) {
      this.$router.push(`/products/${id}`)
    },
    deleteProduct (id) {
      this.$store.dispatch('deleteProduct', id)
    }
  },
  computed: {
    priceRupiah () {
      // console.log(new Intl.NumberFormat('id-Rp', { style: 'currency', currency: 'IDR' }).format(this.product.price))
      return new Intl.NumberFormat('id-Rp', { style: 'currency', currency: 'IDR' }).format(this.product.price)
    }
  }
}
</script>

<style>

</style>
