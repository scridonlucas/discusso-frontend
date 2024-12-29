import {
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
  Icon,
  Divider,
  Button,
} from '@chakra-ui/react';
import { AiOutlineBell } from 'react-icons/ai';
import notificationService from '../../services/notificationService';
import ServerError from '../../components/MainPage/ServerError';
import { useQuery } from '@tanstack/react-query';
import { useMarkAllNotificationsRead } from '../../hooks/useMarkNotificationRead';
import NotificationCard from '../../components/Notification/NotificationCard';
const NotificationList = () => {
  const {
    data: notificationsData,
    isLoading,
    isError,
  } = useQuery(['notifications'], notificationService.gatherNotifications);

  const readAllNotifications = useMarkAllNotificationsRead();

  if (isLoading)
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );

  if (isError) return <ServerError />;

  const handleMarkAllRead = (event: React.MouseEvent) => {
    event.stopPropagation();
    readAllNotifications.mutate();
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
        <Flex align="center" justify="space-between" mb={4}>
          <Flex align="center" gap={2}>
            <Icon as={AiOutlineBell} boxSize={6} />
            <Text fontSize="2xl" fontWeight="bold">
              Notifications
            </Text>
          </Flex>
          <Button
            colorScheme="blue"
            onClick={handleMarkAllRead}
            isDisabled={!notificationsData || notificationsData.length === 0}
            isLoading={readAllNotifications.isLoading}
          >
            Mark all as read
          </Button>
        </Flex>

        <Divider my={4} />

        {notificationsData && notificationsData.length > 0 ? (
          <Stack spacing={4}>
            {notificationsData.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
              />
            ))}
          </Stack>
        ) : (
          <Flex align="center" justify="center" p={6}>
            <Text fontSize="lg" color="gray.400">
              You have no notifications at the moment.
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default NotificationList;
