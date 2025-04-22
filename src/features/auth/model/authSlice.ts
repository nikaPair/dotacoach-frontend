import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email?: string;
  steamId?: string;
  steamAvatar?: string;
  steamDisplayName?: string;
  avatar?: string;
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  authMethod: 'email' | 'steam' | null;
  initialized: boolean;
}

// Проверяем наличие токена для начального состояния
const token = localStorage.getItem('token');

const initialState: AuthState = {
  isAuth: !!token, // Если есть токен, считаем пользователя авторизованным
  user: null,
  authMethod: null,
  initialized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
      state.initialized = true;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.authMethod = null;
      state.initialized = true;
      localStorage.removeItem('token');
    },
    setAuthMethod(state, action: PayloadAction<'email' | 'steam'>) {
      state.authMethod = action.payload;
    },
    setInitialized(state) {
      state.initialized = true;
    },
  },
});

export const { setUser, logout, setAuthMethod, setInitialized } =
  authSlice.actions;
export default authSlice.reducer;
