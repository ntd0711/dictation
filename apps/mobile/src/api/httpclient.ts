import { CustomAxios, Response } from '@mobile/api/axios-client';

export const HttpClient = {
  get<T>(url: string, option?: any): Promise<Response<T>> {
    return CustomAxios.get<T, Response<T>>(url, option);
  },
  post<T>(url: string, params?: any, option?: any): Promise<Response<T>> {
    return CustomAxios.post<T, Response<T>>(url, params, option);
  },
  put<T>(url: string, params?: any): Promise<Response<T>> {
    return CustomAxios.put<T, Response<T>>(url, params);
  },
  patch<T>(url: string, params?: any): Promise<Response<T>> {
    return CustomAxios.patch<T, Response<T>>(url, params);
  },
  delete<T>(url: string, params?: any): Promise<Response<T>> {
    return CustomAxios.delete<T, Response<T>>(url, params);
  },
};
