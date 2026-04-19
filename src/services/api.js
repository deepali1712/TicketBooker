import axios from "axios";

// This creates a reusable connection to your teammate's database
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Make sure she uses port 5000!
});

export default API;
