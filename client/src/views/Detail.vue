<template>
  <div class="container">
      <div v-if="productDetails.name" class="row justify-content-center">
          <div class="col-8">
              <h1>{{ productDetails.name }}</h1>
              <div class="row">
                <div class="col-8">
                  <img :src="productDetails.image_url" class="img-fluid">
                  <button class="btn btn-info m-3" @click="updateStatus()">Edit</button>
                  <button class="btn btn-danger m-3" @click="deleteProduct(productDetails.id)">Delete</button>
                </div>
                <div class="konten col-4">
                  <ul class="list-group">
                    <li class="list-group-item">
                      Stock <br>
                      <small class="text-muted">{{ productDetails.stock }}</small>
                    </li>
                    <li class="list-group-item">
                      Harga <br>
                      <small class="text-muted">Rp {{ productDetails.price }}</small>
                    </li>
                  </ul>
                </div>
                <div class='form col-8' v-if="updateForm === true">
                  <form @submit.prevent="updateProduct">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Nama</label>
                      <input v-model="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nama produk">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Stock</label>
                      <input v-model="stock" type="text" class="form-control" id="exampleInputPassword1" placeholder="Jumlah produk">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Harga</label>
                      <input v-model="price" type="text" class="form-control" id="exampleInputPassword1" placeholder="Harga produk">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Foto</label>
                      <input v-model="image_url" type="text" class="form-control" id="exampleInputPassword1" placeholder="Link gambar">
                    </div>
                    <button type="submit" class="btn btn-primary">Tambahkan</button>
                  </form>
                </div>
              </div>
          </div>
      </div>
      <div v-else>
        <h1>404 Data Not Found</h1>
      </div>
  </div>
</template>

<script>
import axios from '../config/axiosInstance'

export default {
  data () {
    return {
      productDetails: '',
      updateForm: false,
      name: '',
      stock: '',
      price: '',
      image_url: ''
    }
  },
  methods: {
    updateStatus () {
      this.updateForm = true
    },
    updateProduct () {
      const id = this.productDetails.id
      axios({
        method: 'put',
        url: '/products/' + id,
        data: {
          name: this.name,
          stock: this.stock,
          price: this.price,
          image_url: this.image_url
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          console.log(response)
          this.updateForm = false
          this.getProductById()
          // this.$router.push('/products/' + id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProductById () {
      const id = this.$route.params.id
      this.$store.dispatch('getProductById', id)
        .then((data) => {
          const product = data.data.product
          this.productDetails = product
          this.name = product.name
          this.stock = product.stock
          this.price = product.price
          this.image_url = product.image_url
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (id) {
      axios({
        method: 'delete',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((response) => {
          console.log(response)
          this.$router.push('/store')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.updateForm = false
    this.getProductById()
  }
}
</script>

<style>
.container {
  padding-bottom: 100px;
}
.form {
  padding-top: 20px
}
/* .wrapper-detail {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
img {
  width: 500px
}
.konten {
  display: flex;
  justify-content: center;
}
.list-group {
  width: 502px !important
} */
</style>
