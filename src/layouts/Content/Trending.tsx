import { Flex, Stack, Text, Spinner, Icon, Box } from '@chakra-ui/react';
import discussionService from '../../services/discussionService';
import Discussion from '../../components/DiscussionPreview/DiscussionPreview';
import ServerError from '../../components/MainPage/ServerError';
import { useQuery } from '@tanstack/react-query';
import { FiTrendingUp } from 'react-icons/fi';
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
      <Box
        w={20}
        h={20}
        bg="linear-gradient(90deg, #f59e0b, #fb923c)"
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="transform 0.2s ease, box-shadow 0.2s ease"
        _hover={{
          transform: 'scale(1.2)',
          boxShadow: '0 0 15px #f59e0b',
          cursor: 'pointer',
        }}
      >
        {' '}
        <Icon as={FiTrendingUp} w={8} h={8} color="white" />
      </Box>

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
