import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const register = async (userData) => {
  const API_URL = `${BACKEND_URL}api/v1/user/register`;
  /* http://localhost:3001/api/v1/user/register */
  const response = await axios.post(API_URL, userData);
  console.log("Register Response:", response);
  return response.data;
};

const authService = {
  register,
};

export default authService;
