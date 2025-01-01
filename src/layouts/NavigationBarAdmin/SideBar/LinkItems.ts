import {
  FiHome,
  FiFlag,
  FiMessageSquare,
  FiUsers,
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
  {
    name: 'Communities',
    icon: FiPlusCircle,
    path: '/admin/communities',
  },
  {
    name: 'Moderation Logs',
    icon: FiFileText,
    path: '/admin/moderation-logs',
  },
  { name: 'Home', icon: FiHome, path: '/' },
];

export default LinkItems;
