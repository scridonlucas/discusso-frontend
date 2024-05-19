import { Routes, Route, Navigate } from 'react-router-dom';
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
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../reducers/authReducer';

const AppRoutes = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: authService.getAuth,
    refetchOnWindowFocus: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(
        setAuthenticated({
          isAuthenticated: data.success,
          user: data.user,
        })
      );
    }

    if (error) {
      dispatch(
        setAuthenticated({
          isAuthenticated: false,
          user: null,
        })
      );
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <LoadingPage />;
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
