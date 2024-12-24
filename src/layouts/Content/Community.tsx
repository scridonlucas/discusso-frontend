import { Flex, Stack, Text, Spinner } from '@chakra-ui/react';
import SortingBar from '../../components/SortingBar/SortingBar';
import discussionService from '../../services/discussionService';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Discussion from '../../components/DiscussionPreview/DiscussionPreview';
import { useSortingOptions } from '../../hooks/useSortingOptions';
import ServerError from '../../components/MainPage/ServerError';
import { useParams, Navigate } from 'react-router-dom';
const Timeline = () => {
  const { sortCriteria, timeFrame, feedType } = useSortingOptions();
  const { id: communityId } = useParams();
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['discussions', sortCriteria, timeFrame, feedType],
      discussionService.gatherDiscussions,
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor ?? undefined;
        },
      }
    );

  if (isLoading) {
    return (
      <Flex
        align={'center'}
        flexDirection={'column'}
        gap={'3vh'}
        justify={'center'}
        alignItems={'center'}
        minH={'100vh'}
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="white">
          Just a moment! We're gathering all the latest discussions for you...
        </Text>
      </Flex>
    );
  }

  if (!communityId || isNaN(Number(communityId))) {
    return <Navigate to="/communities" />;
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <>
      <SortingBar />
      <Flex align={'center'} justify={'center'}>
        <Stack
          spacing={8}
          mx={'auto'}
          width={'100%'}
          maxW={'5xl'}
          py={12}
          px={6}
        >
          <InfiniteScroll
            dataLength={data?.pages?.length || 0}
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
                page.discussions.map((discussion) => (
                  <Discussion key={discussion.id} discussion={discussion} />
                ))
              )}
            </Stack>
          </InfiniteScroll>
        </Stack>
      </Flex>
    </>
  );
};

export default Timeline;
