<template>
  <header>
        <router-link to="/home"><img src="../assets/logo.png" class="logo"></router-link>
        <ul>
            <li><router-link to="/home">Home</router-link></li>
            <li><router-link to="/store">Store</router-link></li>
            <li><a href="#" @click="logout">Logout</a></li>
        </ul>
    </header>
</template>

<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push('/home')
    }
  }
}
</script>

<style>
header
{
    /* position: absolute; */
    top: 10px;
    /* width: 100%; */
    /* padding: 20px 100px; */
    padding: 0;
    z-index: 11;
    margin: 0;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
header .logo
{
    left: 20px;
    position: relative;
    max-width: 120px;
}
header ul
{
    right: 50px;
    position: relative;
    display: flex;
}
header ul li
{
    list-style: none;
}
header ul li a
{
    display: inline-block;
    color: #333;
    font-weight: 400;
    margin-left: 40px;
    text-decoration: none;
}
</style>
