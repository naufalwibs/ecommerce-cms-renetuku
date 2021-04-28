<template>
  <section id="edit-product-page" class="img-product">
        <div class="container-fluid text-landing d-flex justify-content-center">
            <div class="col-lg backlay white-txt">
                <main class="form-signin">
                    <form>
                        <h1 class="h3 mb-3 fw-normal text-center">Edit Product</h1>
                        <label for="productName">Product Name</label>
                        <input v-model="productFetch.name" type="text" id="product-name" class="form-control" placeholder="Product Name" autofocus>
                        <label for="category">Category</label>
                        <input v-model="productFetch.category" type="text" id="category-product" class="form-control" placeholder="Category">
                        <label for="stock">Stock</label>
                        <input v-model="productFetch.stock" type="number" id="stock" class="form-control" placeholder="Stock">
                        <label for="price">Price</label>
                        <input v-model="productFetch.price" type="number" id="price" class="form-control" placeholder="Price">
                        <label for="imageUrl">Image Url</label>
                        <input v-model="productFetch.image_url" type="url" id="image-url" class="form-control" placeholder="Image Url">
                        <div class="mb-3"></div>
                        <button @click.prevent="editProduct" class="w-100 btn btn-lg btn-outline-light" type="submit">Edit Product</button>
                        <p class="mt-5 mb-3 text-center">&copy; 2021</p>
                    </form>
                </main>
        </div>
    </div>
    </section>
</template>

<script>
export default {
  name: 'EditProduct',
  data () {
    return {
    }
  },
  methods: {
    fetchProductById () {
      // console.log('Fetch')
      const id = this.$route.params.id
      this.$store.dispatch('fetchProductById', id)
      // console.log(id)
    },
    editProduct () {
      const id = this.$route.params.id
      const { name, category, stock, price, imageUrl } = {
        name: this.productFetch.name,
        category: this.productFetch.category,
        stock: this.productFetch.stock,
        price: this.productFetch.price,
        imageUrl: this.productFetch.image_url
      }
      this.$store.dispatch('editProduct', { id, name, category, stock, price, image_url: imageUrl })
    }
  },
  computed: {
    productFetch () {
      return this.$store.state.product
    }
  },
  created () {
    this.fetchProductById()
  }
}
</script>

<style>

</style>
