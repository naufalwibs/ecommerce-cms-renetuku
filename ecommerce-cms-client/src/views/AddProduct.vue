<template>
  <section id="add-product-page" class="img-product">
        <div class="container-fluid text-landing d-flex justify-content-center setting-add">
            <div class="col-lg backlay white-txt">
                <main class="form-signin">
                    <form>
                        <h1 class="h3 mb-3 fw-normal text-center">Add Product</h1>
                        <label for="productName">Product Name</label>
                        <input v-model="name" type="text" id="product-name" class="form-control" placeholder="Product Name" autofocus>
                        <label for="category">Category</label>
                        <input v-model="category" type="text" id="category-product" class="form-control" placeholder="Category">
                        <label for="stock">Stock</label>
                        <input v-model="stock" type="number" id="stock" class="form-control" placeholder="Stock">
                        <label for="price">Price</label>
                        <input v-model="price" type="number" id="price" class="form-control" placeholder="Price">
                        <label for="imageUrl">Image Url</label>
                        <input v-model="image_url" type="url" id="image-url" class="form-control" placeholder="Image Url">
                        <div class="mb-3"></div>
                        <button @click.prevent="addProduct" class="w-100 btn btn-lg btn-outline-light" type="submit">Add Product</button>
                        <p class="mt-5 mb-3 text-center">&copy; 2021</p>
                    </form>
                </main>
        </div>
    </div>
    </section>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      name: '',
      category: '',
      stock: '',
      price: '',
      image_url: ''
    }
  },
  methods: {
    addProduct () {
      this.$store.dispatch('addProduct', { name: this.name, category: this.category, stock: this.stock, price: this.price, image_url: this.image_url })
    }
  }
}
</script>

<style>

</style>
