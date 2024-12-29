import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';
import { Login, Register, MainPage, AdminPage, Unauthorized } from '../pages';
import {
  Timeline,
  Profile,
  Create,
  DetailedDiscussion,
  Trending,
  CommunityList,
  CommunityFeed,
  FavouritesFeed,
  UserDetails,
  Notifications,
} from '../layouts/Content';
import {
  FlaggedDiscussions,
  FlaggedComments,
  DetailedDiscussionTicket,
  DetailedCommentTicket,
  UserManagement,
  ModerationLogs,
  AdminCommunities,
  Analytics,
  AdminDashboard,
} from '../layouts/AdminContent';

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
          <Route path="/communities" element={<CommunityList />} />
          <Route path="/communities/:id" element={<CommunityFeed />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/saved" element={<FavouritesFeed />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route element={<AdminPage />}>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/moderation-logs" element={<ModerationLogs />} />
            <Route path="/admin/communities" element={<AdminCommunities />} />
            <Route
              path="/admin/flagged-discussions"
              element={<FlaggedDiscussions />}
            />
            <Route
              path="/admin/flagged-discussions/:id"
              element={<DetailedDiscussionTicket />}
            />
            <Route
              path="/admin/flagged-comments"
              element={<FlaggedComments />}
            />
            <Route
              path="/admin/flagged-comments/:id"
              element={<DetailedCommentTicket />}
            />
          </Route>
        </Route>
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
