import axios from "axios";

console.log(import.meta.env.API_URL);
console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
