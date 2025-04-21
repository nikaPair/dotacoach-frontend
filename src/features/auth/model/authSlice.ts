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
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  authMethod: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
      state.authMethod = null;
      localStorage.removeItem('token');
    },
    setAuthMethod(state, action: PayloadAction<'email' | 'steam'>) {
      state.authMethod = action.payload;
    },
  },
});

export const { setUser, logout, setAuthMethod } = authSlice.actions;
export default authSlice.reducer;
