import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMeQuery } from '../../features/auth/api/emailAuth';
import { setUser } from '../../features/auth/model/authSlice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useDispatch();

  const { data } = useGetMeQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }
  }, [data, dispatch]);


  return <>{children}</>;
};
