import {
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
  Icon,
  Divider,
  Button,
  Avatar,
} from '@chakra-ui/react';
import { AiOutlineBell } from 'react-icons/ai';
import notificationService from '../../services/notificationService';
import ServerError from '../../components/MainPage/ServerError';
import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useQuery(['notifications'], notificationService.gatherNotifications);

  if (isLoading)
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );

  if (isError) return <ServerError />;

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
        <Flex align="center" justify="space-between" mb={4}>
          <Flex align="center" gap={2}>
            <Icon as={AiOutlineBell} boxSize={6} />
            <Text fontSize="2xl" fontWeight="bold">
              Notifications
            </Text>
          </Flex>
          <Button colorScheme="blue">Mark all as read</Button>
        </Flex>

        <Divider my={4} />

        <Stack spacing={4}>
          {notificationsData.map((notification) => (
            <Box
              key={notification.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              bg={notification.isRead ? 'gray.700' : 'gray.600'}
              _hover={{ bg: 'gray.500' }}
              transition="background-color 0.2s"
            >
              <Flex align="center" justify="space-between">
                <Flex align="center" gap={4}>
                  <Avatar size="sm" bg="blue.500" />
                  <Box>
                    <Text fontSize="md" fontWeight="bold">
                      {notification.type}
                    </Text>
                    <Text fontSize="sm">{notification.content}</Text>
                    <Text fontSize="xs" color="gray.300" mt={1}>
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </Text>
                  </Box>
                </Flex>

                {!notification.isRead && (
                  <Button size="sm" colorScheme="teal" variant="outline">
                    Mark as read
                  </Button>
                )}
              </Flex>
            </Box>
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default Notifications;
