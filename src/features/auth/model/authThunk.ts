import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginByEmail, checkAuth as checkEmailAuth } from '../api/emailAuth';
import { getSteamAuthUrl, authBySteam } from '../api/steamAuth';
import { setUser, setAuthMethod, logout } from './authSlice';

// Авторизация по email
export const loginWithEmail = createAsyncThunk(
  'auth/loginWithEmail',
  async (data: { email: string; password: string }, { dispatch }) => {
    const { token, user } = await loginByEmail(data);
    localStorage.setItem('token', token);
    dispatch(setUser(user));
    dispatch(setAuthMethod('email'));
  }
);

// Авторизация через Steam
export const loginWithSteam = createAsyncThunk(
  'auth/loginWithSteam',
  async (_, { dispatch }) => {
    const { url } = await getSteamAuthUrl();
    window.location.href = url; // Перенаправляем на Steam OAuth
  }
);

// Обработка Steam callback (вызывается после возврата с Steam)
export const handleSteamCallback = createAsyncThunk(
  'auth/handleSteamCallback',
  async (code: string, { dispatch }) => {
    const { token, user } = await authBySteam(code);
    localStorage.setItem('token', token);
    dispatch(setUser(user));
    dispatch(setAuthMethod('steam'));
  }
);

// Проверка авторизации при загрузке приложения
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch }) => {
    try {
      const { user } = await checkEmailAuth();
      dispatch(setUser(user));
    } catch {
      dispatch(logout());
    }
  }
);
