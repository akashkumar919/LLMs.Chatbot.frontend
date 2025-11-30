import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://llms-chatbot.onrender.com",   // Apne backend ka base URL

});



export default axiosClient;

// https://llms-chatbot.onrender.com