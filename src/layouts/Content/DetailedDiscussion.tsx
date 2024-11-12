import { useParams, Navigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Stack,
  Spinner,
  Text,
  Icon,
  Input,
  Button,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import discussionService from '../../services/discussionService';
import ServerError from '../../components/MainPage/ServerError';
import discussionUtils from '../../components/MainPage/discussionUtils';
import { useSaveDiscussion } from '../../hooks/useSaveDiscussion';
import { useLikeDiscussion } from '../../hooks/useLikeDiscussion';
import { FaBookmark, FaHeart } from 'react-icons/fa';
import { FiBookmark, FiFlag, FiHeart } from 'react-icons/fi';
const DetailedDiscussion = () => {
  const { id } = useParams();

  const {
    data: discussion,
    isLoading,
    isError,
  } = useQuery(
    ['discussion', Number(id)!],
    discussionService.getDiscussionById,
    {
      enabled: !!id,
    }
  );

  const {
    data: authData,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useAuth();

  const { likeDiscussion, unlikeDiscussion } = useLikeDiscussion();
  const { addBookmark, removeBookmark } = useSaveDiscussion();

  if (!id) {
    return <Navigate to="/home" />;
  }

  if (isLoading || isAuthLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (isAuthError) {
    return <Navigate to="/login" />;
  }

  if (isError || !discussion) {
    return <ServerError />;
  }

  const userId = authData.user.userId;

  const likedByUser = discussionUtils.isLikedByUser(discussion, userId);
  const savedByUser = discussionUtils.isSavedByUser(discussion, userId);

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    (likedByUser ? unlikeDiscussion : likeDiscussion).mutate(discussion.id);
  };

  const handleSaveDiscussionClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    (savedByUser ? removeBookmark : addBookmark).mutate(discussion.id);
  };

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} width="100%" maxW="5xl" py={12} px={6}>
        <Box borderWidth="1px" borderRadius="md" p={6} boxShadow="md">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontWeight="bold" fontSize="lg">
              {discussion.community.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(discussion.createdAt).toLocaleDateString()}
            </Text>
          </Flex>
          <Text fontWeight="bold" fontSize="2xl" mb={4}>
            {discussion.title}
          </Text>
          <Text fontSize="md" color="gray.700" mb={6}>
            {discussion.content}
          </Text>

          <Flex align="center" gap={4} mb={6}>
            <Icon
              as={likedByUser ? FaHeart : FiHeart}
              color={likedByUser ? 'red.500' : 'gray.500'}
              boxSize={6}
              cursor="pointer"
              onClick={handleLikeClick}
            />
            <Text>{discussion.likes.length}</Text>

            <Icon
              as={savedByUser ? FaBookmark : FiBookmark}
              color={savedByUser ? 'blue.500' : 'gray.500'}
              boxSize={6}
              cursor="pointer"
              onClick={handleSaveDiscussionClick}
            />

            <Icon as={FiFlag} boxSize={6} color="gray.500" cursor="pointer" />
          </Flex>

          <Stack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Comments
            </Text>
            {discussion.comments.map((comment) => (
              <Box key={comment.id} p={4} borderWidth="1px" borderRadius="md">
                <Flex justify="space-between">
                  <Text fontWeight="bold">{comment.user.username}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Text>
                </Flex>
                <Text mt={2}>{comment.content}</Text>
              </Box>
            ))}
          </Stack>

          <Flex mt={4} as="form" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Add a comment..." mr={4} />
            <Button type="submit" colorScheme="blue">
              Post
            </Button>
          </Flex>
        </Box>
      </Stack>
    </Flex>
  );
};

export default DetailedDiscussion;
