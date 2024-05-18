import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProtectedRoutes = () => {
  const isAuthentificated: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthentificated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
