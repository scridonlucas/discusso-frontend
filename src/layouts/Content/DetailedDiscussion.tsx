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
import CommentSection from '../../components/CommentSection/CommentsSection';
import { formatDistanceToNow } from 'date-fns';
import { FiUser } from 'react-icons/fi';

import {
  FiBookmark,
  FiFlag,
  FiHeart,
  FiMessageCircle,
  FiSend,
} from 'react-icons/fi';
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

  const createdDiscussionDate = new Date(discussion.createdAt);

  const formattedcreatedDiscussionDate = formatDistanceToNow(
    createdDiscussionDate,
    {
      addSuffix: true,
    }
  );

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
        <Box borderWidth="1px" borderRadius="lg" p={6} boxShadow="lg">
          {/* Header */}
          <Flex justify="space-between" align="center" mb={4}>
            <Flex align="center" gap={2}>
              <Text fontWeight="bold" fontSize="lg" color="white.300">
                {discussion.community.name}
              </Text>
              <Text fontSize="lg" color="gray.400">
                •
              </Text>
              <Icon as={FiUser} boxSize={5} color="gray.700" />
              <Text fontWeight="bold" fontSize="sm" color="gray.400">
                {discussion.user.username}
              </Text>
              <Text fontSize="lg" color="gray.400">
                •
              </Text>
              <Text fontSize="sm" color="gray.500">
                {formattedcreatedDiscussionDate}
              </Text>
            </Flex>
            <Flex align="center" gap={4}>
              <Icon
                as={savedByUser ? FaBookmark : FiBookmark}
                color={savedByUser ? 'blue.500' : 'gray.500'}
                boxSize={6}
                cursor="pointer"
                onClick={handleSaveDiscussionClick}
                _hover={{ color: savedByUser ? 'blue.300' : 'blue.500' }}
              />
              <Icon
                as={FiFlag}
                boxSize={6}
                color="gray.500"
                cursor="pointer"
                _hover={{ color: 'red.400' }}
              />
            </Flex>
          </Flex>
          {/* Title & Content */}
          <Text fontWeight="bold" fontSize="2xl" mb={2} color="white.300">
            {discussion.title}
          </Text>
          <Text fontSize="md" color="gray.400" mb={6}>
            {discussion.content}
          </Text>

          {/* Actions (Like, Save, Report) */}

          <Flex align="center" gap={4} mb={6}>
            <Flex align="center" gap={2} onClick={handleLikeClick}>
              <Icon
                as={likedByUser ? FaHeart : FiHeart}
                color={likedByUser ? 'red.500' : 'gray.500'}
                boxSize={6}
                cursor="pointer"
                _hover={{
                  transform: 'scale(1.2)',
                  color: likedByUser ? 'red.400' : 'gray.400',
                }}
              />
              <Text>{discussion.likes.length}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon
                as={FiMessageCircle}
                boxSize={6}
                cursor="pointer"
                _hover={{ color: 'gray.400' }}
              />
              <Text>{discussion.comments.length}</Text>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon
                as={FiSend}
                boxSize={6}
                cursor="pointer"
                _hover={{ color: 'blue.400' }}
              />
            </Flex>
          </Flex>

          {/* Comment Input */}
          <Flex as="form" onSubmit={(e) => e.preventDefault()} mb={4}>
            <Input placeholder="Add a comment..." mr={3} variant="filled" />
            <Button type="submit" colorScheme="blue">
              Post
            </Button>
          </Flex>

          {/* Comments List */}
          <Stack spacing={4}>
            <Text fontSize="lg" fontWeight="bold" color="gray.300">
              Comments
            </Text>
            <CommentSection discussionId={Number(id)} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default DetailedDiscussion;
