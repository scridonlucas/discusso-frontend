import { Box, Flex, Text, Icon, Stack } from '@chakra-ui/react';
import { FiThumbsUp, FiMessageSquare } from 'react-icons/fi';
import { Discussion as DiscussionType } from '../../types/discussionTypes';

const Discussion = ({ discussion }: { discussion: DiscussionType }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
      onClick={() => (window.location.href = `/discussions/${discussion.id}`)}
    >
      <Stack spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          {discussion.title}
        </Text>
        <Text fontSize="md" color="gray.500">
          Posted by {discussion.user.username}
        </Text>
        <Text noOfLines={2} color="gray.700">
          {discussion.content}
        </Text>
      </Stack>

      <Flex mt={4} align="center" justify="space-between">
        <Flex align="center">
          <Icon as={FiThumbsUp} mr={2} />
          <Text>{discussion._count.likes} Likes</Text>
        </Flex>
        <Flex align="center">
          <Icon as={FiMessageSquare} mr={2} />
          <Text>{discussion._count.comments} Comments</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Discussion;
