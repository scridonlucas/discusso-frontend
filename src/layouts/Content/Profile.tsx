import {
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
  Icon,
  Avatar,
  Divider,
} from '@chakra-ui/react';
import { FiUsers, FiBookmark, FiMessageSquare } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import userService from '../../services/userService';
import ServerError from '../../components/MainPage/ServerError';
const Profile = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery(['currentUser'], userService.getCurrentUser);

  if (isUserLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isUserError) {
    return <ServerError />;
  }
  console.log(userData);
  const {
    firstName,
    lastName,
    username,
    email,
    gender,
    birthDate,
    createdAt,
    _count,
    role,
  } = userData;

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
        </Flex>

        <Divider my={4} />

        {/* Personal Information */}
        <Box mb={6}>
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Personal Information
          </Text>
          <Stack spacing={2}>
            <Text>Email: {email}</Text>
            <Text>Birth Date: {new Date(birthDate).toLocaleDateString()}</Text>
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
              <Icon as={FiUsers} boxSize={5} color="gray.300" />
              <Text>Communities Followed: {_count.followedCommunities}</Text>
            </Flex>
            <Flex align="center" gap={2}>
              <Icon as={FiBookmark} boxSize={5} color="gray.300" />
              <Text>Saved: {_count.bookmarks}</Text>
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

export default Profile;
