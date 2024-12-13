import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import AuthRoutes from './AuthRoutes';
import Login from '../pages/Login';
import Register from '../pages/Register';
import MainPage from '../pages/Main';
import Timeline from '../layouts/Content/Timeline';
import Profile from '../layouts/Content/Profile';
import Create from '../layouts/Content/Create';
import DetailedDiscussion from '../layouts/Content/DetailedDiscussion';
import AdminRoutes from './AdminRoutes';
import AdminPage from '../pages/Admin';
import FlaggedDiscussions from '../layouts/AdminContent/FlaggedDiscussions';
import FlaggedComments from '../layouts/AdminContent/FlaggedComments';
import DetailedTicket from '../layouts/AdminContent/DetailedDiscussionTicket';
import Unauthorized from '../pages/Unauthorized';
const AppRoutes = () => {
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
          <Route path="/create" element={<Create />} />
          <Route path="/discussions/" element={<Timeline />} />
          <Route path="/discussions/:id" element={<DetailedDiscussion />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route element={<AdminPage />}>
            <Route
              path="/admin"
              element={<Navigate to="/admin/flagged-discussions" />}
            />
            <Route
              path="/admin/flagged-discussions"
              element={<FlaggedDiscussions />}
            />
            <Route
              path="/admin/flagged-discussions/:id"
              element={<DetailedTicket type="discussion" />}
            />
            <Route
              path="/admin/flagged-comments"
              element={<FlaggedComments />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
