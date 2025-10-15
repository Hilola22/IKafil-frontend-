import axios from "axios";

export const api = axios.create({
  baseURL: "http://3.76.183.255:3030/api/",
});