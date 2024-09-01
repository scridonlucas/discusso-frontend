import { Flex, Heading, Stack } from '@chakra-ui/react';
import discussionService from '../../services/discussionService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

const Timeline = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery(['discussions'], discussionService.gatherDiscussions, {
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  if (isLoading) {
    return (
      <Flex align={'center'} justify={'center'} py={12}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex align="center" justify="center" height="100vh" direction="column">
        <Text fontSize="xl" color="red.500" mb={4}>
          Something went wrong.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading>test</Heading>
        <InfiniteScroll
          dataLength={data?.pages?.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<Spinner size="md" />}
          endMessage={<Text>No more discussions to load</Text>}
        >
          {data?.pages?.map((page, i) => (
            <Stack key={i} spacing={4}>
              {page.discussions.map((discussion) => (
                <Box key={discussion.id} p={5} shadow="md" borderWidth="1px">
                  <Text fontSize="xl">{discussion.title}</Text>
                </Box>
              ))}
            </Stack>
          ))}
        </InfiniteScroll>
      </Stack>
    </Flex>
  );
};

export default Timeline;
