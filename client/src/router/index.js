import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import LandingPage from "../views/LandingPage.vue";
import PageNotFound from "../components/PageNotFound.vue";
import EditPage from "../views/EditPage.vue";
import CreatePage from "../views/CreatePage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
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
    path: "/update/:id",
    name: "Edit Page",
    component: EditPage,
  },
  {
    path: "/create",
    name: "Create Page",
    component: CreatePage,
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
