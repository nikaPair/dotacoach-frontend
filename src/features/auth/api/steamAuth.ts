import { api } from '../../../shared/api';
import { AuthResponse } from './emailAuth';
import { setUser, setAuthMethod } from '../model/authSlice';
import { store } from '../../../app/providers/store';

export interface SteamAuthCallbackParams {
  code: string;
}

export const steamAuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    steamCallback: builder.mutation<AuthResponse, SteamAuthCallbackParams>({
      query: (params) => ({
        url: `auth/steam/callback?code=${params.code}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useSteamCallbackMutation } = steamAuthApi;

// Базовый URL API
const API_URL = 'https://dotacoach-server.onrender.com/api';

// Обработчик сообщений от окна авторизации Steam
const handleSteamAuthMessage = (event: MessageEvent) => {
  // Проверяем тип сообщения
  if (event.data.type === 'STEAM_AUTH_SUCCESS') {
    console.log('Получены данные авторизации Steam:', event.data);

    // Получаем данные авторизации
    const authData = event.data.data;
    // Сохраняем токен в localStorage
    localStorage.setItem('token', authData.token);

    // Обновляем состояние Redux
    store.dispatch(setUser(authData.user));
    store.dispatch(setAuthMethod('steam'));

    // Удаляем обработчик сообщений после обработки
    window.removeEventListener('message', handleSteamAuthMessage);

    // Перенаправляем на главную страницу
    window.location.href = '/';
  }
};

// Функция для открытия окна авторизации Steam
export const openSteamAuthWindow = () => {
  // Удаляем существующий обработчик, если он есть
  window.removeEventListener('message', handleSteamAuthMessage);

  // Добавляем обработчик сообщений
  window.addEventListener('message', handleSteamAuthMessage);

  // Steam открывает авторизацию в новом окне
  const steamAuthUrl = `${API_URL}/auth/steam`;
  const width = 800;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  // Открываем окно авторизации
  const authWindow = window.open(
    steamAuthUrl,
    'Steam Login',
    `width=${width},height=${height},left=${left},top=${top}`
  );

  // Проверка закрытия окна без авторизации
  const checkWindowClosed = setInterval(() => {
    if (authWindow && authWindow.closed) {
      clearInterval(checkWindowClosed);
      window.removeEventListener('message', handleSteamAuthMessage);
    }
  }, 1000);
};
