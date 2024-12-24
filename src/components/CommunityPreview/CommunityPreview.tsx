import { Community } from '../../types/communityTypes';
import { useAuth } from '../../hooks/useAuth';
import { Box, Flex, Text, IconButton, Badge } from '@chakra-ui/react';
import { FiUserPlus, FiUserMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import communityUtils from '../MainPage/communityUtils';
import LoadingCommunityPreview from './LoadingCommunityPreview';
import { Navigate } from 'react-router-dom';
import {
  useFollowCommunity,
  useUnfollowCommunity,
} from '../../hooks/useFollowCommunity';
const CommunityPreview = ({ community }: { community: Community }) => {
  const {
    data: authData,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useAuth();

  const followCommunity = useFollowCommunity();
  const unfollowCommunity = useUnfollowCommunity();

  if (isAuthLoading) {
    return <LoadingCommunityPreview />;
  }

  if (isAuthError || !authData.success) {
    return <Navigate to="/login" />;
  }

  const userId = authData.user.userId;

  const followedByUser = communityUtils.isFollowedByUser(community, userId);

  const handleFollowClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    (followedByUser ? unfollowCommunity : followCommunity).mutate(community.id);
  };

  return (
    <Box
      key={community.id}
      as={Link}
      to={`/communities/${community.id}`}
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg="gray.800"
      shadow="md"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{
        transform: 'scale(1.03)',
        shadow: 'xl',
      }}
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="xl" fontWeight="semibold">
          {community.name}
        </Text>
        <IconButton
          icon={followedByUser ? <FiUserMinus /> : <FiUserPlus />}
          aria-label={followedByUser ? 'Unfollow' : 'Follow'}
          colorScheme={followedByUser ? 'red' : 'teal'}
          variant="ghost"
          fontSize="20px"
          onClick={handleFollowClick}
        />
      </Flex>
      <Text fontSize="sm" mb={4} color="gray.300">
        {community.description ||
          'This community does not have a description yet.'}
      </Text>
      <Flex justify="space-between" align="center">
        <Badge colorScheme="teal" variant="subtle" px={4} py={1} rounded={'lg'}>
          Discussions: {community._count.discussions}
        </Badge>
        <Badge colorScheme="blue" variant="subtle" px={4} py={1} rounded={'lg'}>
          Followers: {community._count.followers}
        </Badge>
      </Flex>
    </Box>
  );
};

export default CommunityPreview;
