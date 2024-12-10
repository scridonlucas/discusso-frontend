import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import discussionService from '../../services/discussionService';
import { Flex, Spinner, Text, Stack, Icon } from '@chakra-ui/react';
import CommentsSectionError from './CommentsSectionError';
import { FaCommentDots } from 'react-icons/fa';
import Comment from './Comment';
import { useAuth } from '../../hooks/useAuth';
import { useCommentsSortingOptions } from '../../hooks/useCommentsSortingOptions';
const CommentsSection = ({ discussionId }: { discussionId: number }) => {
  const { sortCriteria } = useCommentsSortingOptions();

  const {
    data: authData,
    isLoading: isLoadingAuth,
    isError: isErrorAuth,
  } = useAuth();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['comments', discussionId, sortCriteria],
      discussionService.gatherComments,
      {
        getNextPageParam: (lastPage) => {
          console.log('Next Cursor:', lastPage.nextCursor);

          return lastPage.nextCursor ?? undefined;
        },
      }
    );

  if (isLoading || isLoadingAuth) {
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

  if (isError || isErrorAuth) {
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
                  <Comment
                    key={comment.id}
                    comment={comment}
                    userId={authData.user.userId}
                  />
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
