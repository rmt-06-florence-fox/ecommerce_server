import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import LandingPage from "../views/LandingPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/landing-page",
    name: "Landing Page",
    component: LandingPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
