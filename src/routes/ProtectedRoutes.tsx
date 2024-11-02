import { Navigate, Outlet } from 'react-router-dom';
import LoadingPage from '../pages/Loading';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoutes = () => {
  const { data, isSuccess, isLoading, isError } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !data.success) {
    return <Navigate to="/login" />;
  }

  if (isSuccess && data.success) return <Outlet />;
};

export default ProtectedRoutes;
