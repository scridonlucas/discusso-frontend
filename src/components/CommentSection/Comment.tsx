import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { Comment as CommentType } from '../../types/commonTypes';
import { formatDistanceToNow } from 'date-fns';
import { FaHeart } from 'react-icons/fa';
import { FiFlag } from 'react-icons/fi';
const Comment = ({ comment }: { comment: CommentType }) => {
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
          <Text fontWeight="medium" fontSize="sm" color="gray.300">
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
          <Flex align="center" gap={2}>
            {/* Like logic */}
            <Icon as={FaHeart} cursor="pointer" boxSize={5} />
            <Text fontSize="sm" color="gray.400">
              {comment._count.likes}
            </Text>
          </Flex>
          <Flex>
            {/* Report logic */}
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
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Comment;
