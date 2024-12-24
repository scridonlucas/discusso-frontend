import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi';
import { LinkItemProps } from '../types';

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Trending', icon: FiTrendingUp, path: '/trending' },
  { name: 'Explore', icon: FiCompass, path: '/home' },
  { name: 'Favourites', icon: FiStar, path: '/saved' },
  { name: 'Settings', icon: FiSettings, path: '/settings' },
];

export default LinkItems;
