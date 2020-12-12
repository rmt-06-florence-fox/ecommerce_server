<template>
  <div class="z-depth-2 valign-wrapper" id="formCreate">
    <div class="row">
      <center>
        <div class="col s12"><h3>Edit Form</h3></div>
      </center>
      <form @submit.prevent="edit" class="col s12">
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
  props: ["id"],
  data() {
    return {
      name: this.$store.state.productById.name,
      image_url: this.$store.state.productById.image_url,
      price: this.$store.state.productById.price,
      stock: this.$store.state.productById.stock,
    };
  },
  methods: {
    edit() {
      const payload = {
        id: this.id,
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
      };
      console.log(payload);
      this.$store.dispatch("editProduct", payload);
      this.$router.push("/landing-page");
    },
  },
};
</script>

<style>
#formEdit {
  margin: 5rem;
  padding: 2rem;
  width: 60%;
}
</style>
