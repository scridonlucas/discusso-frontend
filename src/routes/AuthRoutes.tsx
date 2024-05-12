import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
  const loggedIn: boolean = false;
  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutes;
