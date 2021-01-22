<template>
  <div>
    <Nav></Nav>
    <CardBoard></CardBoard>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import CardBoard from "../components/CardBoard";
export default {
  components: {
    Nav,
    CardBoard
  }

  // computed: {
  //   product() {
  //     return this.$store.this.state.productData;
  //   },
  // },
};
</script>

<style></style>
