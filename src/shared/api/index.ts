import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Типы данных для профиля пользователя
export interface UserProfile {
  id: string;
  email?: string;
  steamId?: string;
  steamDisplayName?: string;
  steamAvatar?: string;
  steamProfile?: string;
  isAdmin?: boolean;
}

export interface ProfileResponse {
  user: UserProfile;
}

// Типы данных для статистики игрока
export interface PlayerStats {
  totalMatches: number;
  wins: number;
  losses: number;
  winRate: number;
  mainRoles: string[];
}

// Типы данных для матча
export interface Match {
  id: string;
  result: 'win' | 'loss';
  hero: string;
  heroIcon?: string;
  heroImg?: string;
  kills: number;
  deaths: number;
  assists: number;
  date: string;
}

// Ответ API на запрос статистики игрока
export interface PlayerStatsResponse {
  stats: PlayerStats;
  recentMatches: Match[];
}

/**
 * Создание API-клиента для взаимодействия с бэкендом
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      // Добавляем токен авторизации из localStorage, если он есть
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Получение аналитики
    getAnalytics: builder.query({
      query: (steamId) => `analytics/${steamId}`,
    }),

    // Получение профиля пользователя
    getProfile: builder.query<ProfileResponse, void>({
      query: () => 'auth/me',
    }),

    // Получение статистики игрока
    getPlayerStats: builder.query<PlayerStatsResponse, string>({
      query: (steamId) => `profile/stats/${steamId}`,
    }),
  }),
});

// Экспорт хуков для использования API
export const {
  useGetAnalyticsQuery,
  useGetProfileQuery,
  useGetPlayerStatsQuery,
} = api;
