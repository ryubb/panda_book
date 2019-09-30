import axiosbase from "axios";

const token = localStorage.getItem("token");
const axios = axiosbase.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Authorization: `Bearer ${token}`
  },
  responseType: "json"
});

export default axios;
