<template>
  <div class="col s12 m6 l4 xl3">
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
          <a href="" @click.prevent="showEdit"
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
    showEdit() {
      this.$router.push(`/update/${this.card.id}`);
    },
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
