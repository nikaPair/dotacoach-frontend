import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '../../features/auth/api/emailAuth';
import { setUser } from '../../features/auth/model/authSlice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();

  // Проверка авторизации при загрузке приложения
  const { data } = useGetMeQuery(undefined, {
    // Пропускаем запрос, если нет токена
    skip: !localStorage.getItem('token'),
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);

  // Если загрузка, можно показать индикатор загрузки
  // Но здесь опущено для простоты

  return <>{children}</>;
};
