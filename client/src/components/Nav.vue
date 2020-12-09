<template>
  <nav>
    <div class="nav-wrapper grey darken-1">
      <a href="#" class="brand-logo center">E-Commerce</a>
      <ul id="nav-mobile" class="left">
        <li>
          <a
            data-target="modal-create"
            class="waves-effect waves-light btn grey darken-3 modal-trigger"
            >Create Product</a
          >
        </li>
      </ul>
      <ul id="nav-mobile" class="right">
        <li>
          <a @click="logout" class="waves-effect waves-light btn grey darken-3"
            >Logout</a
          >
        </li>
      </ul>
      <router-view />
    </div>

    <!-- Modal Structure -->

    <div id="modal-create" class="modal">
      <div class="modal-content">
        <div class="row">
          <div class="col s12 center black-text">
            <h3>Create Product</h3>
          </div>
          <form @submit.prevent="create" class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input
                  v-model="name"
                  value=""
                  id="create-name"
                  type="text"
                  class="validate"
                />
                <label for="create-name">Name</label>
              </div>
              <div class="input-field col s12">
                <input
                  v-model="image_url"
                  value=""
                  id="create-image-url"
                  type="text"
                  class="validate"
                />
                <label for="create-image-url">Image Url</label>
              </div>
              <div class="input-field col s12">
                <input
                  v-model="price"
                  value=""
                  id="create-price"
                  type="number"
                  class="validate"
                />
                <label for="create-stock">Price</label>
              </div>
              <div class="input-field col s12">
                <input
                  v-model="stock"
                  value=""
                  id="create-stock"
                  type="number"
                  class="validate"
                />
                <label for="create-price">Stock</label>
              </div>
            </div>
            <button
              class="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Submit
            </button>
          </form>
        </div>
        <div class="modal-footer">
          <a href="" class="modal-close waves-effect btn-flat">Close</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      image_url: "",
      price: "",
      stock: ""
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    create() {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock
      };
      this.$store.dispatch("createProduct", payload);
    }
  }
};
</script>

<style></style>
