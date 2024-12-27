import { useQuery } from '@tanstack/react-query';
import userService from '../../services/userService';
const Profile = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(['users', 1], userService.getUserById);
  return <>Profile</>;
};

export default Profile;
