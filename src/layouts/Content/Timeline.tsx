import { Flex, Heading, Stack } from '@chakra-ui/react';
import discussionService from '../../services/discussionService';
import { useInfiniteQuery } from 'react-query';

const Timeline = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery('discussions', discussionService.gatherDiscussions);
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Heading>test</Heading>
      </Stack>
    </Flex>
  );
};

export default Timeline;
