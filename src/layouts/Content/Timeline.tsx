import { Flex, Heading, Stack } from '@chakra-ui/react';
import discussionService from '../../services/discussionService';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';

const Timeline = () => {
  /*const { data } = useQuery({
    queryKey: ['discussions'],
    queryFn: discussionService.gatherDiscussions,
    refetchOnWindowFocus: false,
    retry: false,
  });*/

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(['discussions'], discussionService.gatherDiscussions, {
      getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading>test</Heading>
      </Stack>
    </Flex>
  );
};

export default Timeline;
