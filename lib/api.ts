import { fetchHandler } from './handlers/fetch';
import ROUTES from '@/constants/routes';
import { API_ACCOUNTS_URL, API_BASE_URL, API_USERS_URL } from '@/constants';
import { RegisterDeviceParams } from '@/types';

// A sample fetch
// fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
//   method: 'PUT',
//   body: JSON.stringify(accountData),
// });

export const api = {
  auth: {
    signIn: ({ device_id, device_name }: RegisterDeviceParams) =>
      fetchHandler(`${API_BASE_URL}/auth/${ROUTES.SIGN_IN_WITH_OAUTH}`, {
        method: 'POST',
        body: JSON.stringify({ user, provider, providerAccountId }),
      }),
  },
  users: {
    getAll: () => fetchHandler(`${API_USERS_URL}`),
    getById: (id: string) => fetchHandler(`${API_USERS_URL}/${id}`),
    getByEmail: (email: string) =>
      fetchHandler(`${API_USERS_URL}/email`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
    create: (userData: Partial<IUser>) =>
      fetchHandler(`${API_USERS_URL}`, {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    update: (id: string, userData: Partial<IUser>) =>
      fetchHandler(`${API_USERS_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_USERS_URL}/${id}`, { method: 'DELETE' }),
  },
  accounts: {
    getAll: () => fetchHandler(`${API_ACCOUNTS_URL}`),
    getById: (id: string) => fetchHandler(`${API_ACCOUNTS_URL}/${id}`),
    getByProvider: (providerAccountId: string) =>
      fetchHandler(`${API_ACCOUNTS_URL}/provider`, {
        method: 'POST',
        body: JSON.stringify({ providerAccountId }),
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandler(`${API_ACCOUNTS_URL}`, {
        method: 'POST',
        body: JSON.stringify(accountData),
      }),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler(`${API_ACCOUNTS_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(accountData),
      }),
    delete: (id: string) =>
      fetchHandler(`${API_ACCOUNTS_URL}/${id}`, { method: 'DELETE' }),
  },
};
