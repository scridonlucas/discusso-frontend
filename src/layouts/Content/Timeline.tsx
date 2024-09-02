import { Flex, Heading, Stack } from '@chakra-ui/react';
import discussionService from '../../services/discussionService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Button } from '@chakra-ui/react';
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

  if (isError) {
    return (
      <Flex
        align="center"
        justify="center"
        height="100vh"
        direction="column"
        p={6}
      >
        <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" mb={4} />
        <Text fontSize="2xl" color="red.500" fontWeight="bold" mb={2}>
          Oops! Something went wrong.
        </Text>
        <Text
          fontSize="md"
          color="gray.600"
          mb={6}
          textAlign="center"
          maxW="sm"
        >
          We encountered an unexpected error while trying to gather data from
          our servers. Please try refreshing the page, or contact support if the
          problem persists.
        </Text>
        <Button onClick={() => window.location.reload()} size="lg">
          Refresh Page
        </Button>
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
