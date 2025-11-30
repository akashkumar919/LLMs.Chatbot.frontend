import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",   // Apne backend ka base URL

});



export default axiosClient;

// https://llms-chatbot.onrender.com