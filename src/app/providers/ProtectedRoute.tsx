import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { useGetMeQuery } from '../../features/auth/api/emailAuth';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuth, initialized } = useSelector((state: RootState) => state.auth);
  const token = localStorage.getItem('token');

  // Проверяем, загружаются ли данные пользователя
  const { isLoading } = useGetMeQuery(undefined, {
    skip: !token || isAuth, // Пропускаем запрос, если нет токена или пользователь уже авторизован
  });

  // Если инициализация еще не завершена, показываем индикатор загрузки
  if (!initialized || (token && isLoading)) {
    return <div>Загрузка...</div>;
  }

  // Если есть токен, но пользователь не авторизован в Redux, возможно данные еще загружаются
  // Поэтому проверяем наличие токена дополнительно
  if (!isAuth && !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};
