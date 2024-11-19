import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import commentDiscussionService from '../../services/commentDiscussionService';
import {
  Flex,
  Spinner,
  Text,
  Icon,
  Button,
  Stack,
  Box,
} from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
const CommentsSection = ({ discussionId }: { discussionId: number }) => {
  const [sortCriteria, useSortCriteria] = useState<string>('recent');

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['comments', discussionId, sortCriteria],
      commentDiscussionService.gatherComments,
      {
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      }
    );

  if (isLoading) {
    return (
      <Flex
        align="center"
        justify="center"
        py={4}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        align="center"
        justify="center"
        py={4}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <Icon as={FiAlertTriangle} w={10} h={10} color="red.500" mb={4} />
        <Text fontSize="xl" color="red.500" fontWeight="bold" mb={2}>
          Oops! Something went wrong.
        </Text>
        <Text
          fontSize="sm"
          color="gray.500"
          mb={6}
          textAlign="center"
          maxW="sm"
        >
          We encountered an unexpected error while trying to gather comments
          from our servers. Please try refreshing the page, or contact support
          if the problem persists.
        </Text>
        <Button onClick={() => window.location.reload()} size="md">
          Refresh Page
        </Button>
      </Flex>
    );
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width={'100%'} maxW={'5xl'} py={12} px={6}>
        <InfiniteScroll
          dataLength={data?.pages.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <Stack align="center" justify="center" width="100%" py={4}>
              <Spinner size="md" />
            </Stack>
          }
        >
          <Stack spacing={4} align={'center'} justify={'center'}>
            {data.pages.map((page) =>
              page.comments.map((comment) => (
                <Box
                  key={comment.id}
                  p={4}
                  borderRadius="md"
                  boxShadow="xl"
                  width="100%"
                >
                  <Flex justify="space-between">
                    <Text fontWeight="medium" color="gray.200">
                      {comment.user.username}
                    </Text>
                    <Text fontSize="xs" color="gray.400">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Text>
                  </Flex>
                  <Text mt={2} color="gray.300">
                    {comment.content}
                  </Text>
                </Box>
              ))
            )}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </Flex>
  );
};

export default CommentsSection;
