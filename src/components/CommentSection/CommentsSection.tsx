import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import commentDiscussionService from '../../services/commentDiscussionService';
import { Flex, Spinner, Text, Stack, Box, Icon } from '@chakra-ui/react';
import CommentsSectionError from './CommentsSectionError';
import { formatDistanceToNow } from 'date-fns';
import { FaCommentDots, FaHeart } from 'react-icons/fa';
import { FiFlag } from 'react-icons/fi';
const CommentsSection = ({ discussionId }: { discussionId: number }) => {
  const [sortCriteria] = useState<string>('recent');

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['comments', discussionId, sortCriteria],
      commentDiscussionService.gatherComments,
      {
        getNextPageParam: (lastPage) => {
          console.log('Next Cursor:', lastPage.nextCursor);

          return lastPage.nextCursor ?? undefined;
        },
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
    return <CommentsSectionError />;
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width={'100%'} maxW={'5xl'}>
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
            {data.pages.length > 0 &&
            data.pages.some((page) => page.comments.length > 0) ? (
              data.pages.map((page) =>
                page.comments.map((comment) => (
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
                          fontWeight="medium"
                          fontSize="sm"
                          color="gray.300"
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
                ))
              )
            ) : (
              <Flex direction="column" align="center" justify="center" gap={3}>
                <Icon as={FaCommentDots} boxSize={8} color="gray.500" />
                <Text fontSize="md" fontWeight="medium" color="gray.300">
                  No comments yet. Be the first to share your thoughts!
                </Text>
              </Flex>
            )}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </Flex>
  );
};

export default CommentsSection;
