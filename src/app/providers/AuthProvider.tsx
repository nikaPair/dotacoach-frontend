import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '../../features/auth/api/emailAuth';
import {
  setUser,
  setAuthMethod,
  setInitialized,
} from '../../features/auth/model/authSlice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  // Запрос данных пользователя только если есть токен
  const { data, isLoading, isError } = useGetMeQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    // Если нет токена, сразу отмечаем, что инициализация завершена
    if (!token) {
      dispatch(setInitialized());
      return;
    }

    // Если запрос завершен (успешно или с ошибкой)
    if (!isLoading) {
      // Если есть данные пользователя, устанавливаем их в Redux
      if (data?.user) {
        dispatch(setUser(data.user));

        // Определяем метод авторизации по наличию steamId
        if (data.user.steamId) {
          dispatch(setAuthMethod('steam'));
        } else {
          dispatch(setAuthMethod('email'));
        }

        console.log('Пользователь авторизован:', data.user);
      } else {
        // Если данные не пришли, отмечаем что инициализация завершена
        dispatch(setInitialized());
      }
    }
  }, [data, dispatch, token, isLoading, isError]);

  // Добавляем вывод для отладки
  console.log(
    'AuthProvider render, token exists:',
    !!token,
    'user data:',
    data?.user
  );

  return <>{children}</>;
};
