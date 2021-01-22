<template>
  <div class=" container">
    <EditForm :id="id"></EditForm>
  </div>
</template>

<script>
import EditForm from "../components/EditForm";
export default {
  data() {
    return {
      id: "",
    };
  },
  name: "EditPage",
  created() {
    this.$route.params.id;
    this.id = this.$route.params.id;
    this.$store.dispatch("fetchProductById", this.id);
  },
  components: {
    EditForm,
  },
};
</script>

<style></style>
