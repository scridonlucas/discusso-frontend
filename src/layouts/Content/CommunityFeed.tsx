import { Flex, Stack, Text, Spinner, Box, VStack } from '@chakra-ui/react';
import SortingBar from '../../components/SortingBar/SortingBar';
import communityService from '../../services/communityService';
import discussionService from '../../services/discussionService';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Discussion from '../../components/DiscussionPreview/DiscussionPreview';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import ServerError from '../../components/MainPage/ServerError';
import { useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';

const CommunityFeed: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState<string>('recent');
  const [timeFrame, setTimeFrame] = useState<string>('all');
  const [feedType, setFeedType] = useState<string>('explore');
  const { id: communityId } = useParams();
  const {
    data: discussionsData,
    fetchNextPage,
    hasNextPage,
    isLoading: isDiscussionsLoading,
    isError: isDiscussionsError,
  } = useInfiniteQuery(
    [
      'discussions',
      Number(communityId)!,
      feedType,
      sortCriteria,
      timeFrame,
      false,
    ],
    discussionService.gatherDiscussions,
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? undefined;
      },
      enabled: !!communityId,
    }
  );
  const {
    data: communityData,
    isLoading: isCommunityLoading,
    isError: isCommunityError,
  } = useQuery(
    ['community', Number(communityId)!],
    communityService.getCommunityById,
    {
      enabled: !!communityId,
    }
  );

  if (isDiscussionsLoading || isCommunityLoading) {
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

  if (isDiscussionsError || isCommunityError) {
    return <ServerError />;
  }

  const handleSortChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setSortCriteria(value);
    }
  };

  const handleTimeFrameChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setTimeFrame(value);
    }
  };

  const handleFeedTypeChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setFeedType(value);
    }
  };

  return (
    <Box>
      <SortingBar
        sortCriteria={sortCriteria}
        onSortChange={handleSortChange}
        timeFrame={timeFrame}
        onTimeFrameChange={handleTimeFrameChange}
        feedType={feedType}
        onFeedTypeChange={handleFeedTypeChange}
      />
      <VStack py={6}>
        <LayoutTitle title={communityData.name} mb={0} color="cyan.400" />

        <Stack
          spacing={8}
          mx={'auto'}
          width={'100%'}
          maxW={'5xl'}
          py={6}
          px={6}
        >
          <InfiniteScroll
            dataLength={discussionsData?.pages?.length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            loader={
              <Stack align="center" justify="center" width="100%" py={4}>
                <Spinner size="md" />
              </Stack>
            }
          >
            <Stack spacing={4} align={'center'} justify={'center'}>
              {discussionsData.pages.map((page) =>
                page.discussions.map((discussion) => (
                  <Discussion key={discussion.id} discussion={discussion} />
                ))
              )}
            </Stack>
          </InfiniteScroll>
        </Stack>
      </VStack>
    </Box>
  );
};

export default CommunityFeed;
