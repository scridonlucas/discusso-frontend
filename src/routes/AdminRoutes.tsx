import { Navigate, Outlet } from 'react-router-dom';
import LoadingPage from '../pages/Loading';
import { useAuth } from '../hooks/useAuth';

const AdminRoutes = () => {
  const { data, isSuccess, isLoading, isError } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError || !data.success || data.user.role !== 'ADMIN') {
    return <Navigate to="/unauthorized" />;
  }

  if (isSuccess && data.success) return <Outlet />;

  return <Navigate to="/unauthorized" />;
};

export default AdminRoutes;
