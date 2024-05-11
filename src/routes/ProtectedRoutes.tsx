import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const loggedIn: boolean = false;
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
