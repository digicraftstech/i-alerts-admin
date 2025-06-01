import { fetchHandler } from './handlers/fetch';
import { API_BASE_URL, API_PRODUCTS_URL, API_SCALES_URL } from '@/constants';
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
      fetchHandler(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: JSON.stringify({ device_id, device_name }),
      }),
  },
  register: ({ device_id, device_name }: RegisterDeviceParams) =>
    fetchHandler(`${API_BASE_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ device_id, device_name }),
    }),
  scales: {
    getAll: () => fetchHandler(`${API_SCALES_URL}`),
    getById: (id: string) => fetchHandler(`${API_SCALES_URL}/${id}`),
    getByFixture: (fixture: string) =>
      fetchHandler(`${API_PRODUCTS_URL}/fixture`, {
        method: 'POST',
        body: JSON.stringify({ fixture }),
      }),
    create: (scaleData: Partial<IScale>) =>
      fetchHandler(`${API_SCALES_URL}`, {
        method: 'POST',
        body: JSON.stringify(scaleData),
      }),
    update: (id: string, scaleData: Partial<IScale>) =>
      fetchHandler(`${API_SCALES_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(scaleData),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_SCALES_URL}/${id}`, { method: 'DELETE' }),
  },
  products: {
    getAll: () => fetchHandler(`${API_PRODUCTS_URL}`),

    getById: (id: string) => fetchHandler(`${API_PRODUCTS_URL}/${id}`),

    getByPLU: (product_plu: number) =>
      fetchHandler(`${API_PRODUCTS_URL}/plu`, {
        method: 'POST',
        body: JSON.stringify({ product_plu }),
      }),

    create: (productData: Partial<IProduct>) =>
      fetchHandler(`${API_PRODUCTS_URL}`, {
        method: 'POST',
        body: JSON.stringify(productData),
      }),

    update: (id: string, productData: Partial<IProduct>) =>
      fetchHandler(`${API_PRODUCTS_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
      }),

    delete: (id: string) =>
      fetchHandler(`${API_PRODUCTS_URL}/${id}`, { method: 'DELETE' }),
  },
};
