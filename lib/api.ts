import { fetchHandler } from './handlers/fetch';
import { BaseURL, APIProductsURL, APIScalesURL } from '@/constants';
import { RegisterDeviceParams } from '@/types';
import { IProduct, IScale } from '@/app/interfaces';

// A sample fetch
// fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
//   method: 'PUT',
//   body: JSON.stringify(accountData),
// });

export const api = {
  auth: {
    register: ({ device_id, device_name }: RegisterDeviceParams) =>
      fetchHandler(`${BaseURL}/register`, {
        method: 'POST',
        body: JSON.stringify({ device_id, device_name }),
      }),
  },
  register: ({ device_id, device_name }: RegisterDeviceParams) =>
    fetchHandler(`${BaseURL}/register`, {
      method: 'POST',
      body: JSON.stringify({ device_id, device_name }),
    }),
  scales: {
    getAll: () => fetchHandler(`${APIScalesURL}`),
    getById: (id: string) => fetchHandler(`${APIScalesURL}/${id}`),
    getByFixture: (fixture: string) =>
      fetchHandler(`${APIProductsURL}/fixture`, {
        method: 'POST',
        body: JSON.stringify({ fixture }),
      }),
    create: (scaleData: Partial<IScale>) =>
      fetchHandler(`${APIScalesURL}`, {
        method: 'POST',
        body: JSON.stringify(scaleData),
      }),
    update: (id: string, scaleData: Partial<IScale>) =>
      fetchHandler(`${APIScalesURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(scaleData),
      }),
    delete: (id: string) =>
      fetchHandler(`${APIScalesURL}/${id}`, { method: 'DELETE' }),
  },
  products: {
    getAll: () => fetchHandler(`${APIProductsURL}`),

    getById: (id: string) => fetchHandler(`${APIProductsURL}/${id}`),

    getByPLU: (product_plu: number) =>
      fetchHandler(`${APIProductsURL}/plu`, {
        method: 'POST',
        body: JSON.stringify({ product_plu }),
      }),

    create: (productData: Partial<IProduct>) =>
      fetchHandler(`${APIProductsURL}`, {
        method: 'POST',
        body: JSON.stringify(productData),
      }),

    update: (id: string, productData: Partial<IProduct>) =>
      fetchHandler(`${APIProductsURL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      }),

    delete: (id: string) =>
      fetchHandler(`${APIProductsURL}/${id}`, { method: 'DELETE' }),
  },
};
