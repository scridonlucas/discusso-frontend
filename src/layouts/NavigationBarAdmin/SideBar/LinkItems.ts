import {
  FiHome,
  FiFlag,
  FiMessageSquare,
  FiUsers,
  FiBarChart2,
  FiPlusCircle,
  FiFileText,
  FiGrid,
} from 'react-icons/fi';
import { LinkItemProps } from '../types';

const LinkItems: Array<LinkItemProps> = [
  {
    name: 'Dashboard',
    icon: FiGrid,
    path: '/admin/dashboard',
  },
  {
    name: 'Flagged Discussions',
    icon: FiFlag,
    path: '/admin/flagged-discussions',
  },
  {
    name: 'Flagged Comments',
    icon: FiMessageSquare,
    path: '/admin/flagged-comments',
  },
  { name: 'User Management', icon: FiUsers, path: '/admin/user-management' },
  { name: 'Analytics', icon: FiBarChart2, path: '/' },
  {
    name: 'Communities',
    icon: FiPlusCircle,
    path: '/',
  },
  {
    name: 'Moderation Logs',
    icon: FiFileText,
    path: '/admin/moderation-logs',
  },
  { name: 'Home', icon: FiHome, path: '/' },
];

export default LinkItems;
