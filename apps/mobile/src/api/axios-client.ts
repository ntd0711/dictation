import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface Body<T> {
  statusCode: number;
  payload?: T;
  message?: string[];
}
export interface Response<T> {
  message?: string;
  statusCode?: number;
  data?: T;
  error?: string[];
}
const CustomAxios = axios.create({
  baseURL: 'http://localhost:3001/api',
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60 * 1000,
});

CustomAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },
  <T>(error: AxiosError<Body<T>>): Response<T> => {
    // Do something with request error
    return handleError(error);
  }
);

CustomAxios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // return {
    //   statusCode: response.data.statusCode,
    //   data: response.data.payload,
    // };
    console.log('response userr', response);
    return response;
  },
  <T>(error: AxiosError<Body<T>>): Response<T> => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return handleError<T>(error);
  }
);
const handleError = <T>(error: AxiosError<Body<T>>): Response<T> => {
  console.log(error.response);
  return;
};

export { CustomAxios };
