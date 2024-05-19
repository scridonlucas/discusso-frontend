import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import authService from '../services/authService';
import LoadingPage from '../pages/Loading';

const AuthRoutes = () => {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: authService.getAuth,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !data.success) {
    return <Outlet />;
  }

  if (isSuccess && data.success) {
    return <Navigate to="/" />;
  }
};

export default AuthRoutes;
