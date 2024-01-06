import axios from "axios";

const api_key = import.meta.env.VITE_TMDB_KEY;
const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/search",
  headers: {
    Authorization: `Bearer ${api_key}`,
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
