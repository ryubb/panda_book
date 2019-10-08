import axiosbase from "axios";

const axios = axiosbase.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  responseType: "json"
});

export default axios;
