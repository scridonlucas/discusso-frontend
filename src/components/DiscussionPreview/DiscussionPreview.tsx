import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import LoadingDiscussion from './LoadingDiscussionPreview';
import ReportModal from '../Modals/ReportModal';
import utils from '../MainPage/discussionUtils';
import {
  FiHeart,
  FiMessageCircle,
  FiUser,
  FiFlag,
  FiBookmark,
} from 'react-icons/fi';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { Discussion as DiscussionType } from '../../types/discussionTypes';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useLikeDiscussion } from '../../hooks/useLikeDiscussion';
import { useSaveDiscussion } from '../../hooks/useSaveDiscussion';
import { useReportDiscussion } from '../../hooks/useReportDiscussion';
import { useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const Discussion = ({ discussion }: { discussion: DiscussionType }) => {
  const { data, isLoading, isError } = useAuth();
  const { likeDiscussion, unlikeDiscussion } = useLikeDiscussion();
  const { addBookmark, removeBookmark } = useSaveDiscussion();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const reportDiscussion = useReportDiscussion();

  if (isLoading) {
    return <LoadingDiscussion />;
  }

  if (isError || !data.success) {
    return <Navigate to="/login" />;
  }

  const userId = data.user.userId;

  const likedByUser = utils.isLikedByUser(discussion, userId);
  const savedByUser = utils.isSavedByUser(discussion, userId);

  const formattedDate = formatDistanceToNow(new Date(discussion.createdAt), {
    addSuffix: true,
  });

  const handleLikeClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    (likedByUser ? unlikeDiscussion : likeDiscussion).mutate(discussion.id);
  };

  const handleSaveDiscussionClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    (savedByUser ? removeBookmark : addBookmark).mutate(discussion.id);
  };

  const handleOpenModalClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen();
  };

  const handleReportSubmit = (reason: string, notes?: string) => {
    reportDiscussion.mutate(
      {
        discussionId: discussion.id,
        reportData: { reportReason: reason, reportNote: notes },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Box
      as={Link}
      to={`/discussions/${discussion.id}`}
      borderWidth="1px"
      borderRadius="md"
      p={6}
      boxShadow="md"
      maxW="3xl"
      width="100%"
      _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
    >
      <Flex
        justify="space-between"
        align="center"
        color="gray.500"
        fontSize="sm"
        mb={2}
      >
        <Flex align="center">
          <Text mr={2}>{discussion.community.name}</Text>
          <Text>|</Text>
          <Text ml={2}>{formattedDate}</Text>
        </Flex>
        <Flex align="center" gap={4}>
          <Icon
            as={FiFlag}
            boxSize={6}
            color="gray.500"
            _hover={{ color: 'red.400', transform: 'scale(1.1)' }}
            transition="transform 0.2s ease, color 0.2s ease"
            onClick={handleOpenModalClick}
          />
          <Icon
            as={savedByUser ? FaBookmark : FiBookmark}
            boxSize={6}
            color={savedByUser ? 'blue.500' : 'gray.500'}
            transition="transform 0.2s ease, color 0.2s ease"
            _hover={{
              color: savedByUser ? 'blue.300' : 'blue.500',
              transform: 'scale(1.1)',
            }}
            onClick={handleSaveDiscussionClick}
          />
        </Flex>
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
        <Flex align="center" gap={2} color="gray.800" fontSize="md">
          <Icon as={FiUser} boxSize={5} color="gray.700" />
          <Text fontWeight="semibold" color="gray.300">
            {discussion.user.username}
          </Text>
        </Flex>
        <Flex align="center" gap={4}>
          <Flex align="center" gap={2} onClick={handleLikeClick}>
            <Icon
              as={likedByUser ? FaHeart : FiHeart}
              boxSize={6}
              color={likedByUser ? 'red.500' : 'gray.500'}
              transition="transform 0.2s ease, color 0.2s ease"
              _hover={{
                transform: 'scale(1.2)',
                color: likedByUser ? 'red.400' : 'gray.400',
              }}
            />
            <Text fontSize="xl">{discussion._count.likes}</Text>
          </Flex>

          <Flex align="center" gap={2}>
            <Icon
              as={FiMessageCircle}
              boxSize={6}
              transition="transform 0.2s ease, color 0.2s ease"
              _hover={{
                transform: 'scale(1.2)',
                color: 'gray.400',
              }}
            />
            <Text fontSize="xl">{discussion._count.comments}</Text>
          </Flex>
        </Flex>
      </Flex>

      <ReportModal
        reportTarget="discussion"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleReportSubmit}
        isLoading={reportDiscussion.isLoading}
      />
    </Box>
  );
};

export default Discussion;
