import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import LoadingDiscussion from './LoadingDiscussion';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { Discussion as DiscussionType } from '../../types/discussionTypes';
import { formatDistanceToNow } from 'date-fns';
import { isLikedByUser } from './utils';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useToggleLike } from '../../hooks/useLikeDiscussion';

const Discussion = ({ discussion }: { discussion: DiscussionType }) => {
  const { data, isLoading, isError } = useAuth();
  const { likeDiscussion, unlikeDiscussion } = useToggleLike();

  if (isLoading) {
    return <LoadingDiscussion />;
  }

  if (isError || !data.success) {
    return <Navigate to="/login" />;
  }

  const userId = data.user.userId;

  const likedByUser = isLikedByUser(discussion, userId);

  const createdDate = new Date(discussion.createdAt);

  const formattedDate = formatDistanceToNow(createdDate, { addSuffix: true });

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    (likedByUser ? unlikeDiscussion : likeDiscussion).mutate(discussion.id);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={6}
      boxShadow="md"
      maxW="2xl"
      width="100%"
      _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
      onClick={() => (window.location.href = `/discussions/${discussion.id}`)}
    >
      <Flex align="center" color="gray.500" fontSize="sm" mb={2}>
        <Text mr={2}>{discussion.community.name}</Text>
        <Text>|</Text>
        <Text ml={2}>{formattedDate}</Text>{' '}
      </Flex>

      <Text fontWeight="bold" fontSize="2xl" mb={4}>
        {discussion.title}
      </Text>

      <Text noOfLines={3} fontSize="md" color="gray.700" mb={4}>
        {discussion.content}
      </Text>

      <Flex
        justify="space-between"
        align="center"
        color="gray.500"
        fontSize="sm"
      >
        <Text>Posted by {discussion.user.username}</Text>
        <Flex align="center">
          <Flex align="center" mr={4}>
            <Icon
              as={likedByUser ? FaHeart : FiHeart}
              mr={2}
              boxSize={7}
              color={likedByUser ? 'red.500' : 'gray.500'}
              onClick={handleLikeClick}
            />

            <Text fontSize="xl">{discussion._count.likes}</Text>
          </Flex>
          <Flex align="center">
            <Icon as={FiMessageCircle} mr={2} boxSize={7} />
            <Text fontSize="xl">{discussion._count.comments}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Discussion;
