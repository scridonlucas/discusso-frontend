import { Flex, Stack, Text, Spinner } from '@chakra-ui/react';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { useQuery } from '@tanstack/react-query';
import ServerError from '../../components/MainPage/ServerError';
import communityService from '../../services/communityService';
import CommunityPreview from '../../components/CommunityPreview/CommunityPreview';

const CommunityList = () => {
  const { data, isLoading, isError } = useQuery(
    ['communities'],
    communityService.gatherCommunities
  );

  if (isLoading) {
    return (
      <Flex
        align={'center'}
        flexDirection={'column'}
        gap={6}
        justify={'center'}
        alignItems={'center'}
        minH={'100vh'}
        bg="gray.900"
        color="white"
      >
        <Spinner size="xl" color="teal.300" />
        <Text fontSize="lg" fontWeight="medium">
          Loading the best communities for you...
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
      py={10}
      px={6}
      bg="gray.800"
      color="white"
    >
      <LayoutTitle title="Discover & Join Communities" />
      <Stack spacing={6} width="80%">
        {data.map((community) => (
          <CommunityPreview key={community.id} community={community} />
        ))}
      </Stack>
    </Flex>
  );
};

export default CommunityList;
