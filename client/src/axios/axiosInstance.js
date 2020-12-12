import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-commerce-adhim1st.herokuapp.com",
});

export default instance;
