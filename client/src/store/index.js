import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "../axios/axiosInstance.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    productData: []
  },
  mutations: {
    setProductData(state, payload) {
      state.productData = payload;
    }
  },
  actions: {
    login(context, payload) {
      axios({
        url: "/users/login",
        method: "POST",
        data: payload
      })
        .then(response => {
          localStorage.setItem("access_token", response.data.access_token);
          router.push("/landing-page");
        })
        .catch(err => console.log(err));
    },
    logout() {
      localStorage.removeItem("access_token");
      router.push("/login");
    },
    fetchProduct(context) {
      axios({
        method: "GET",
        url: "/products",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log(response.data);
          context.commit("setProductData", response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createProduct(context, payload) {
      console.log(payload);
      axios({
        method: "POST",
        url: "/products",
        data: payload,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProduct(context, id) {
      axios({
        method: "DELETE",
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
    // editProduct(context, id, payload) {
    //   axios({
    //     method: "PUT",
    //     url: `/products/${id}`,
    //     data: payload,
    //     headers: {
    //       access_token: localStorage.getItem("access_token"),
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  getters: {},
  modules: {}
});
