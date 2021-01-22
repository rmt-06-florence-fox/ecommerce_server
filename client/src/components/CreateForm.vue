<template>
  <div class="z-depth-2 valign-wrapper" id="formCreate">
    <div class="row">
      <center>
        <div class="col s12"><h3>Create Form</h3></div>
      </center>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      image_url: "",
      price: "",
      stock: "",
    };
  },
  methods: {
    create() {
      const payload = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      this.$store.dispatch("createProduct", payload);
      this.$router.push("/landing-page");
    },
  },
};
</script>

<style>
#formCreate {
  margin: 5rem;
  padding: 2rem;
  width: 60%;
}
</style>
