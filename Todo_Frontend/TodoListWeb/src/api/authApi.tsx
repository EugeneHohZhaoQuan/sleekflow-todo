import axios, { AxiosError } from 'axios';
import { Login, Signup } from '../types/types';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5252/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

const postSignUp = async (credentials: Signup) => {
  try {
    const response = await axiosInstance.post('/signup', credentials);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const postLogin = async (credentials: Login) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const authApi = {
  postLogin,
  postSignUp,
};
