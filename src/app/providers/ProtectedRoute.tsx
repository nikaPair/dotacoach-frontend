import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (!isAuth) {
    // Перенаправляем на страницу входа, если пользователь не авторизован
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};
