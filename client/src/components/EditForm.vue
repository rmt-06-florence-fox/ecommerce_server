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
              v-model="productId.name"
              value=""
              id="create-name"
              type="text"
              class="validate"
            />
            <label for="create-name">Name</label>
          </div>
          <div class="input-field col s12">
            <input
              v-model="productId.image_url"
              value=""
              id="create-image-url"
              type="text"
              class="validate"
            />
            <label for="create-image-url">Image Url</label>
          </div>
          <div class="input-field col s12">
            <input
              v-model="productId.price"
              value=""
              id="create-price"
              type="number"
              class="validate"
            />
            <label for="create-stock">Price</label>
          </div>
          <div class="input-field col s12">
            <input
              v-model="productId.stock"
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
    return {};
  },
  methods: {
    edit() {
      this.$store.dispatch("editProduct", this.productId);
    },
    fetchProductId() {
      this.$store.dispatch("fetchProductId", this.id);
    },
  },

  created() {
    this.fetchProductId();
  },
  computed: {
    productId() {
      return this.$store.state.productById;
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
