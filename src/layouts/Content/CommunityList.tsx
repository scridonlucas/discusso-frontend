import { Flex, Stack, Text, Spinner, Icon, Box } from '@chakra-ui/react';
import { FiUsers } from 'react-icons/fi';
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
      py={8}
      px={6}
      bg="gray.800"
      color="white"
    >
      <Flex align="center" justify={'center'} gap={4} mb={4}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="transform 0.2s ease, box-shadow 0.2s ease"
          borderRadius="full"
          _hover={{
            transform: 'scale(1.2)',
            cursor: 'pointer',
          }}
        >
          <Icon as={FiUsers} w={8} h={8} color="teal.300" />
        </Box>
        <Box>
          <LayoutTitle title="Discover & Join Communities" />
        </Box>
      </Flex>
      <Stack spacing={4} width="80%" py={8} px={6}>
        {data.map((community) => (
          <CommunityPreview key={community.id} community={community} />
        ))}
      </Stack>
    </Flex>
  );
};

export default CommunityList;
