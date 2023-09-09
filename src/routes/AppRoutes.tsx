import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../pages/Login';
import Authentification from '../pages/Authentification';
import MainPage from '../pages/Main';
import Timeline from '../layouts/Content/Timeline';
import Profile from '../layouts/Content/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Authentification />} />
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
