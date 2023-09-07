import axios from "axios";
import { BASE_URL } from "../const/const";
let authUser = JSON.parse(localStorage.getItem("auth"));
const instance = axios.create({
  baseURL: BASE_URL,
});
instance.defaults.headers.common["Authorization"] = `${authUser?.token}`?`${authUser?.token}`:"";
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers.put["Content-Type"] = "application/json";
instance.interceptors.request.use(
  (request) => {
    request.headers.channelName = "PIP Project";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// after making the & before getting http response
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 404) {
      console.log("NOT FOUND");
    }
    return Promise.reject(error);
  }
);
// request wait for 2 second
instance.defaults.timeout = 2000;
export default instance;
