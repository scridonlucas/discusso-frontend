import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiUsers,
  FiUser,
} from 'react-icons/fi';

import { LinkItemProps } from '../types';

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, path: '/' },
  { name: 'Trending', icon: FiTrendingUp, path: '/trending' },
  { name: 'Favourites', icon: FiStar, path: '/saved' },
  { name: 'Communities', icon: FiUsers, path: '/communities' },
  { name: 'Explore', icon: FiCompass, path: '/home' },
  { name: 'Profile', icon: FiUser, path: '/profile' },
];

export default LinkItems;
