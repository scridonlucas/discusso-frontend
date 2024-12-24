import { Flex, Stack, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import discussionService from '../../services/discussionService';
import Discussion from '../../components/DiscussionPreview/DiscussionPreview';
import ServerError from '../../components/MainPage/ServerError';
import { useInfiniteQuery } from '@tanstack/react-query';

type DiscussionQueryKey = [
  string,
  number | null,
  string,
  string,
  string,
  boolean
];

interface DiscussionSectionProps {
  queryKey: DiscussionQueryKey;
}

const DiscussionSection: React.FC<DiscussionSectionProps> = ({ queryKey }) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(queryKey, discussionService.gatherDiscussions, {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? undefined;
      },
    });

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
      </Flex>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  return (
    <Stack spacing={8}>
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
  );
};

export default DiscussionSection;
