import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../pages/Login/LoginPage';
import MainPage from '../pages/Main/MainPage';
import Timeline from '../pages/Main/Content/Timeline';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainPage />}>
          <Route path="/" element={<Timeline />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
