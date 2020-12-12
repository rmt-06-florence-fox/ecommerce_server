<template>
  <nav>
    <div class="nav-wrapper grey darken-1">
      <a href="#" class="brand-logo center">E-Commerce</a>
      <ul id="nav-mobile" class="left">
        <li>
          <a
            @click="showCreate"
            class="waves-effect waves-light btn grey darken-3"
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
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    showCreate() {
      this.$router.push("/create");
    },
  },
};
</script>

<style></style>
