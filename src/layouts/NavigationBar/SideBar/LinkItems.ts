import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiUsers,
} from 'react-icons/fi';
import { LinkItemProps } from '../types';

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Trending', icon: FiTrendingUp, path: '/trending' },
  { name: 'Communities', icon: FiUsers, path: '/communities' },
  { name: 'Favourites', icon: FiStar, path: '/saved' },
  { name: 'Explore', icon: FiCompass, path: '/home' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
];

export default LinkItems;
