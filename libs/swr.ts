import axios, { AxiosRequestConfig } from 'axios';

export const _swr = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function axiosSwr<T>(url: string, config?: AxiosRequestConfig) {
  const response = await _swr(url, config);

  return response.data as T;
}
