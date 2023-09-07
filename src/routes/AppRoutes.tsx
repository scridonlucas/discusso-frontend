import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../pages/Login/LoginPage';
import MainPage from '../pages/Main/MainPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<MainPage />}></Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
