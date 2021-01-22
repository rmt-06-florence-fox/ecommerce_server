<template>
  <center>
    <div class="container" id="loginBox">
      <div class="z-depth-1 grey lighten-4 row" id="loginForm">
        <h3>Login</h3>
        <form @submit.prevent="login" class="col s12">
          <div class="row">
            <div class="col s12"></div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="email"
                class="validate"
                type="email"
                name="email"
                id="email"
              />
              <label for="email">Enter your email</label>
            </div>
          </div>

          <div class="row">
            <div class="input-field col s12">
              <input
                v-model="password"
                class="validate"
                type="password"
                name="password"
                id="password"
              />
              <label for="password">Enter your password</label>
            </div>
          </div>

          <br />
          <center>
            <div class="row">
              <button
                type="submit"
                name="btn_login"
                class="col s12 btn btn-large waves-effect indigo"
              >
                Login
              </button>
            </div>
          </center>
        </form>
      </div>
    </div>
  </center>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("login", payload);
    },
  },
};
</script>

<style>
body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #fff;
}

#loginBox {
  margin-top: 6rem;
  width: 40%;
}
#loginForm {
  padding: 4rem 8rem 4rem 8rem;
}

.input-field input[type="date"]:focus + label,
.input-field input[type="text"]:focus + label,
.input-field input[type="email"]:focus + label,
.input-field input[type="password"]:focus + label {
  color: #e91e63;
}

.input-field input[type="date"]:focus,
.input-field input[type="text"]:focus,
.input-field input[type="email"]:focus,
.input-field input[type="password"]:focus {
  border-bottom: 2px solid #e91e63;
  box-shadow: none;
}
</style>
