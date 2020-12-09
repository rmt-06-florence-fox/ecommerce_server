import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import LandingPage from "../views/LandingPage.vue";
import PageNotFound from "../components/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/landing-page",
    name: "Landing Page",
    component: LandingPage,
  },
  {
    path: "*",
    name: "Page Not Found",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.access_token;
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else if (to.name == "Login" && isAuthenticated)
    next({ name: "Landing Page" });
  else next();
});

export default router;
