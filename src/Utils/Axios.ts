import { useRecoilValue } from 'recoil';
import Axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse,InternalAxiosRequestConfig } from 'axios';
import { loginState } from '../auth/Stores/AuthAtom';

export const useAdminAppService = () => {
  const login_response = useRecoilValue(loginState);

  const adminAppService: AxiosInstance = Axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  adminAppService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const newConfig = { ...config };
    newConfig.headers = newConfig.headers || {};
    newConfig.headers.Authorization = login_response.token ? `Bearer ${login_response.token}` : '';
    return newConfig;
  });

  adminAppService.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error: AxiosError<{ error?: string; message?: string }>) => {
      const message = error.response?.data?.error || 
                     error.response?.data?.message || 
                     error.message ||
                     'An unknown error occurred';
      console.log(error);
      throw new Error(message);
    }
  );

  return adminAppService;
};