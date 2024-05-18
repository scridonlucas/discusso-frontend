import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const AuthRoutes = () => {
  const isAuthentificated: boolean = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthentificated ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutes;
