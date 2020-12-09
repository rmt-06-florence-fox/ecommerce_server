<template>
  <div class="container">
      <div v-if="productDetails.name" class="row justify-content-center">
          <div class="col-8">
              <h1>{{ productDetails.name }}</h1>
              <div class="row">
                <div class="col-8">
                  <img :src="productDetails.image_url" class="img-fluid">
                  <button class="btn btn-info m-3">Edit</button>
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
      productDetails: ''
    }
  },
  methods: {
    getProductById () {
      const id = this.$route.params.id
      axios({
        method: 'GET',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then((data) => {
          const product = data.data.product
          this.productDetails = product
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
    this.getProductById()
  }
}
</script>

<style>
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
