import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import authService from '../services/authService';
import LoadingPage from '../pages/Loading';

const ProtectedRoutes = () => {
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: authService.getAuth,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !data.success) {
    return <Navigate to="/login" />;
  }

  if (isSuccess && data.success) return <Outlet />;
};

export default ProtectedRoutes;
