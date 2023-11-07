import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const loggedIn: boolean = true;
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
