import {
  FiHome,
  FiFlag,
  FiMessageSquare,
  FiUsers,
  FiBarChart2,
  FiPlusCircle,
  FiFileText,
} from 'react-icons/fi';
import { LinkItemProps } from '../types';

const LinkItems: Array<LinkItemProps> = [
  { name: 'Flagged Discussions', icon: FiFlag, path: '/' },
  { name: 'Flagged Comments', icon: FiMessageSquare, path: '/' },
  { name: 'User Management', icon: FiUsers, path: '/' },
  { name: 'Analytics', icon: FiBarChart2, path: '/' },
  {
    name: 'Communities',
    icon: FiPlusCircle,
    path: '/',
  },
  {
    name: 'Logs',
    icon: FiFileText,
    path: '/',
  },
  { name: 'Home', icon: FiHome, path: '/' },
];

export default LinkItems;
