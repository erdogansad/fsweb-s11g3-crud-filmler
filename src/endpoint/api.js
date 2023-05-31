import axios from "axios";

const axiosWithAuth = () => {
  return axios.create({
    baseURL: "http://localhost:9000/api",
  });
};

let axiosInterface = axiosWithAuth();

export default axiosInterface;
