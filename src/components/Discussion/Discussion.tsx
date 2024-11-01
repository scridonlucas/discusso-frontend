import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { FiHeart, FiMessageCircle, FiMessageSquare } from 'react-icons/fi';
import { Discussion as DiscussionType } from '../../types/discussionTypes';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { isLikedByUser } from './utils';
import { AuthResponse } from '../../types/authTypes';

const Discussion = ({ discussion }: { discussion: DiscussionType }) => {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<AuthResponse>(['auth']);

  const username = queryData ? queryData.user.username : '';

  const likedByUser = isLikedByUser(discussion, username);

  const createdDate = new Date(discussion.createdAt);

  const formattedDate = formatDistanceToNow(createdDate, { addSuffix: true });

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
            <Icon as={FiHeart} mr={2} boxSize={5} />
            <Text fontSize="lg">{discussion._count.likes}</Text>
          </Flex>
          <Flex align="center">
            <Icon as={FiMessageCircle} mr={2} boxSize={5} />
            <Text fontSize="lg">{discussion._count.comments}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Discussion;
