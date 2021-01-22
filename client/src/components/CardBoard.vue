<template>
  <div class="container">
    <div class="row">
      <div class="input-field col s12">
        <i class="material-icons prefix">search</i>
        <input v-model="search" type="text" class="autocomplete" />
        <label for="autocomplete-input">Search Product</label>
      </div>
      <Card
        v-for="(card, index) in $store.state.productData"
        :key="index"
        :card="card"
      ></Card>
    </div>
    <!-- <p>{{ productFilter }}</p> -->
  </div>
</template>

<script>
import Card from "../components/Card";

export default {
  data() {
    return {
      search: "",
    };
  },
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
    filterSearch() {
      return this.$store.getters.filterProduct(this.search);
    },
  },
};
</script>

<style></style>
