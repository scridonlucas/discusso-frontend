import {
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
  Icon,
  Avatar,
  Divider,
  Button,
} from '@chakra-ui/react';
import { FiFileText, FiMessageSquare } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import userService from '../../services/userService';
import ServerError from '../../components/MainPage/ServerError';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useFollowUser, useUnfollowUser } from '../../hooks/useFollowUser';
import userProfileUtils from '../../components/MainPage/userProfileUtils';
const UserDetails = () => {
  const { id } = useParams();

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(['userProfile', Number(id)!], userService.getPublicUserDetails, {
    enabled: !!id,
  });

  const {
    data: authData,
    isLoading: isAuthLoading,
    isError: isAuthError,
  } = useAuth();

  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();

  if (!id) {
    return <Navigate to="/home" />;
  }

  if (isUserLoading || isAuthLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isUserError || isAuthError) {
    return <ServerError />;
  }

  const userId = authData.user.userId;

  const followedByUser = userProfileUtils.isFollowdByUser(userData, userId);

  const { firstName, lastName, username, gender, createdAt, _count, role } =
    userData;

  const handleFollowClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    (followedByUser ? unfollowUser : followUser).mutate(Number(id));
  };

  return (
    <Flex align="center" justify="center" p={6}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="lg"
        width="100%"
        maxW="4xl"
        bg="gray.800"
        color="white"
      >
        {/* Profile Header */}
        <Flex align="center" gap={4} mb={6}>
          <Box
            w={20}
            h={20}
            bg="linear-gradient(135deg, #4A90E2, #9013FE)"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{
              transform: 'scale(1.1)',
              boxShadow: '0 0 15px rgba(144, 19, 254, 0.7)',
              cursor: 'pointer',
            }}
          >
            <Avatar
              name={`${firstName} ${lastName}`}
              size="lg"
              bg="transparent"
              color="white"
            />
          </Box>{' '}
          <Box>
            <Text
              fontSize="2xl"
              fontWeight="bold"
            >{`${firstName} ${lastName}`}</Text>
            <Text fontSize="lg" color="gray.400">
              @{username}
            </Text>
            <Text fontSize="sm" color="gray.500">
              Role: {role.roleName} | Gender: {gender}
            </Text>
          </Box>
          <Button
            ml="auto"
            colorScheme={followedByUser ? 'red' : 'blue'}
            onClick={handleFollowClick}
            isLoading={followUser.isLoading || unfollowUser.isLoading}
          >
            {followedByUser ? 'Unfollow' : 'Follow'}
          </Button>
        </Flex>
        <Divider my={4} />
        <Box mb={6}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Social Stats
          </Text>
          <Flex gap={6} wrap="wrap">
            <Flex
              align="center"
              gap={2}
              p={4}
              borderRadius="md"
              bg="gray.700"
              _hover={{
                bg: 'gray.600',
                transform: 'scale(1.05)',
                cursor: 'pointer',
              }}
              transition="transform 0.2s"
            >
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="xl" color="blue.300">
                  {_count.followers}
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Followers
                </Text>
              </Box>
            </Flex>
            <Flex
              align="center"
              gap={2}
              p={4}
              borderRadius="md"
              bg="gray.700"
              _hover={{
                bg: 'gray.600',
                transform: 'scale(1.05)',
                cursor: 'pointer',
              }}
              transition="transform 0.2s"
            >
              <Box textAlign="center">
                <Text fontWeight="bold" fontSize="xl" color="blue.300">
                  {_count.following}
                </Text>
                <Text fontSize="sm" color="gray.300">
                  Following
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Divider my={4} />

        {/* Personal Information */}
        <Box mb={6}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Personal Information
          </Text>
          <Stack spacing={2}>
            <Text>
              Member Since: {new Date(createdAt).toLocaleDateString()}
            </Text>
          </Stack>
        </Box>

        <Divider my={4} />

        {/* Statistics */}
        <Box mb={6}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Statistics
          </Text>
          <Flex gap={6} wrap="wrap">
            <Flex align="center" gap={2}>
              <Icon as={FiFileText} boxSize={5} color="gray.300" />
              <Text>Discussions: {_count.discussions}</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Icon as={FiMessageSquare} boxSize={5} color="gray.300" />
              <Text>Comments: {_count.comments}</Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserDetails;
