<template>
  <div class="container">
    <div class="row">
      <Card v-for="(card, index) in product" :key="index" :card="card"></Card>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";

export default {
  methods: {
    fetchProduct() {
      this.$store.dispatch("fetchProduct");
    },
  },
  components: {
    Card,
  },
  created() {
    this.fetchProduct();
  },
  computed: {
    product() {
      return this.$store.state.productData;
    },
  },
};
</script>

<style></style>
