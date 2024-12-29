import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { Comment as CommentType } from '../../types/commonTypes';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart } from 'react-icons/fa';
import { FiFlag, FiHeart } from 'react-icons/fi';
import commentsUtils from '../MainPage/commentsUtils';
import { useLikeComment } from '../../hooks/useLikeComment';
import { useReportComment } from '../../hooks/useReportComment';
import { useDisclosure } from '@chakra-ui/react';
import ReportModal from '../Modals/ReportModal';
import { Link } from 'react-router-dom';
const Comment = ({
  comment,
  userId,
}: {
  comment: CommentType;
  userId: number;
}) => {
  const { likeComment, unlikeComment } = useLikeComment();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const reportComment = useReportComment();

  const isCommentLikedByUser = commentsUtils.isCommentLikedByUser(
    comment,
    userId
  );

  const handleLikeCommentClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    (isCommentLikedByUser ? unlikeComment : likeComment).mutate({
      commentId: comment.id,
      discussionId: comment.discussionId,
    });
  };

  const handleOpenModalClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen();
  };

  const handleReportSubmit = (reason: string) => {
    reportComment.mutate(
      { commentId: comment.id, reportReason: { reportReason: reason } },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };
  return (
    <Box
      key={comment.id}
      p={3}
      borderRadius="lg"
      boxShadow="base"
      border="1px solid"
      borderColor="gray.700"
      bg="gray.800"
      width="100%"
    >
      <Flex direction={'column'} gap={3}>
        <Flex justify="space-between" align="center">
          <Text
            as={Link}
            to={`/users/${comment.userId}`}
            fontWeight="medium"
            fontSize="sm"
            color="gray.300"
            _hover={{ color: 'gray.400' }}
          >
            {comment.user.username}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </Flex>
        <Text fontSize="sm" color="gray.400">
          {comment.content}
        </Text>
        <Flex align="center" gap={3}>
          <Flex align="center" gap={2} onClick={handleLikeCommentClick}>
            <Icon
              as={isCommentLikedByUser ? FaHeart : FiHeart}
              color={isCommentLikedByUser ? 'red.500' : 'gray.500'}
              cursor="pointer"
              transition="transform 0.2s ease, color 0.2s ease"
              _hover={{
                transform: 'scale(1.2)',
                color: isCommentLikedByUser ? 'red.400' : 'gray.400',
              }}
              boxSize={5}
            />
            <Text fontSize="sm" color="gray.400">
              {comment._count.likes}
            </Text>
          </Flex>
          <Flex>
            <Icon
              as={FiFlag}
              cursor="pointer"
              boxSize={5}
              color="gray.500"
              transition="transform 0.2s ease, color 0.2s ease"
              _hover={{
                color: 'red.400',
                transform: 'scale(1.2)',
              }}
              onClick={handleOpenModalClick}
            />
          </Flex>
        </Flex>
      </Flex>
      <ReportModal
        reportTarget="comment"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleReportSubmit}
        isLoading={reportComment.isLoading}
      />
    </Box>
  );
};

export default Comment;
