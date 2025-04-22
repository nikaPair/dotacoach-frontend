import { api } from '../../../shared/api';

export interface EmailAuthData {
  email: string;
  password: string;
}

export interface RegisterData extends EmailAuthData {
  confirmPassword?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email?: string;
    steamId?: string;
    steamDisplayName?: string;
    steamAvatar?: string;
  };
}

// RTK Query API для авторизации
export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, EmailAuthData>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getMe: builder.query<{ user: AuthResponse['user'] }, void>({
      query: () => {
        const token = localStorage.getItem('token');
        return {
          url: 'auth/me',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      // При успешном ответе кэшируем данные
      keepUnusedDataFor: 300, // Храним данные 5 минут
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi;
