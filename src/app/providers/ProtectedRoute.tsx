import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};
