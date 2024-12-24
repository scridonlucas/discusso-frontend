import {
  Flex,
  Stack,
  Text,
  Spinner,
  Badge,
  Box,
  IconButton,
} from '@chakra-ui/react';
import LayoutTitle from '../../components/LayoutTitle/LayoutTitle';
import { Link } from 'react-router-dom';
import { FiUserPlus, FiUserMinus, FiUser } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import ServerError from '../../components/MainPage/ServerError';
import communityService from '../../services/communityService';

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
      bg="gray.800" // Keeping your default gray background
      color="white"
    >
      <LayoutTitle title="Discover & Join Communities" />
      <Stack spacing={6} width="80%">
        {data.map((community) => (
          <Box
            key={community.id}
            as={Link}
            to={`/community/${community.id}`}
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            bg="gray.800"
            shadow="md"
            transition="transform 0.3s, box-shadow 0.3s"
            _hover={{
              transform: 'scale(1.03)',
              shadow: 'xl',
            }}
          >
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="xl" fontWeight="semibold">
                {community.name}
              </Text>
              <IconButton
                icon={true ? <FiUserPlus /> : <FiUserMinus />}
                aria-label={true ? 'Follow' : 'Unfollow'}
                colorScheme={true ? 'teal' : 'red'}
                variant="ghost"
                fontSize="20px"
              />
            </Flex>
            <Text fontSize="sm" mb={4} color="gray.300">
              {community.description ||
                'This community does not have a description yet.'}
            </Text>
            <Flex justify="space-between" align="center">
              <Badge
                colorScheme="teal"
                variant="subtle"
                px={4}
                py={1}
                rounded={'lg'}
              >
                Discussions: {community._count.discussions}
              </Badge>
              <Badge
                colorScheme="blue"
                variant="subtle"
                px={4}
                py={1}
                rounded={'lg'}
              >
                Followers: {community._count.followers}
              </Badge>
            </Flex>
          </Box>
        ))}
      </Stack>
    </Flex>
  );
};

export default CommunityList;
