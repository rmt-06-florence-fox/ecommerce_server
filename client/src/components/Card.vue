<template>
  <div class="col s12 m4">
    <div class="card">
      <div class="card-image">
        <img id="phone-image" :src="card.image_url" />
      </div>
      <div class="card-content">
        <span class="card-title">{{ card.name }}</span>
        <span>Price : {{ card.price }}</span>
        <br />
        <span>Stock : {{ card.stock }}</span>
      </div>
      <div class="card-action">
        <div>
          <a href="" data-target="modal-edit" class="modal-trigger"
            ><i class="material-icons">edit</i></a
          >
        </div>

        <div>
          <a @click="deleteProduct" href="">
            <i class="material-icons">delete</i></a
          >
        </div>
      </div>
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
  props: ["card"],
  methods: {
    deleteProduct() {
      const id = this.card.id;
      this.$store.dispatch("deleteProduct", id);
    },
    // editProduct() {
    //   const id = this.card.id;
    //   const payload = {
    //     name: this.name,
    //     image_url: this.image_url,
    //     price: this.price,
    //     stock: this.stock,
    //   };
    //   this.$store.dispatch("editProduct", id, payload);
    // },
  },
};
</script>

<style>
#phone-image {
  height: 20rem;
  width: 80%;
  object-fit: contain;
  margin: auto;
}

.card-action {
  display: flex;
  justify-content: space-between;
}
</style>
