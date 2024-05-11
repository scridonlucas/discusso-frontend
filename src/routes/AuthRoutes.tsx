import { Navigate, Outlet } from 'react-router-dom';
//import { useQuery } from '@tanstack/react-query';
//import authService from '../services/authService';

const AuthRoutes = () => {
  /*const result = useQuery({
    queryKey: ['auth'],
    queryFn: authService.getAuth,
  });
  console.log(result.data);*/
  const loggedIn: boolean = false;
  return loggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoutes;
