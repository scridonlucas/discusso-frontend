import { Flex, Stack, Text, Spinner } from '@chakra-ui/react';
import discussionService from '../../services/discussionService';
import Discussion from '../../components/DiscussionPreview/DiscussionPreview';
import ServerError from '../../components/MainPage/ServerError';
import { useQuery } from '@tanstack/react-query';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
const Trending = () => {
  const { data, isLoading, isError } = useQuery(
    ['trendingDiscussions'],
    discussionService.gatherTrendingDiscussions
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

  if (isError) {
    return <ServerError />;
  }

  return (
    <Flex
      align="center"
      justify="center"
      flexDirection="column"
      maxW="6xl"
      mx="auto"
      py={8}
      px={6}
      bg="gray.800"
      color="white"
    >
      <LayoutTitle title="Trending Discussions" mb={0} />
      <Flex align={'center'} justify={'center'}>
        <Stack
          spacing={8}
          mx={'auto'}
          width={'100%'}
          maxW={'5xl'}
          py={8}
          px={6}
        >
          <Stack spacing={4} align={'center'} justify={'center'}>
            {data.discussions.map((discussion) => (
              <Discussion key={discussion.id} discussion={discussion} />
            ))}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Trending;
