import { Flex, Heading, Stack } from '@chakra-ui/react';
import discussionService from '../../services/discussionService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Button } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

const Timeline = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(['discussions'], discussionService.gatherDiscussions, {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

  if (status === 'loading') {
    return (
      <Flex align={'center'} justify={'center'} py={12}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading>test</Heading>
      </Stack>
    </Flex>
  );
};

export default Timeline;
