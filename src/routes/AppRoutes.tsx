import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setAuthenticated } from '../reducers/authReducer';
import { useQuery } from '@tanstack/react-query';
import authService from '../services/authService';
import ProtectedRoutes from './ProtectedRoutes';
import AuthRoutes from './AuthRoutes';
import LoadingPage from '../pages/Loading';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MainPage from '../pages/Main';
import Timeline from '../layouts/Content/Timeline';
import Profile from '../layouts/Content/Profile';

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: authService.getAuth,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    dispatch(
      setAuthenticated({
        isAuthenticated: false,
        user: {
          username: '',
          role: '',
        },
      })
    );
  }

  if (data) {
    dispatch(
      setAuthenticated({
        isAuthenticated: data.success,
        user: {
          username: data.user.username,
          role: data.user.role,
        },
      })
    );
  }

  return (
    <Routes>
      <Route element={<AuthRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainPage />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Timeline />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
