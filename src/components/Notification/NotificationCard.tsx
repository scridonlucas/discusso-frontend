import { Box, Flex, Avatar, Text, Icon } from '@chakra-ui/react';
import { Notification as NotificationType } from '../../types/commonTypes';
import { AiOutlineEye } from 'react-icons/ai';
import { formatDistanceToNow } from 'date-fns';
import { useMarkNotificationRead } from '../../hooks/useMarkNotificationRead';
interface NotificationProps {
  notification: NotificationType;
}
const NotificationCard: React.FC<NotificationProps> = ({ notification }) => {
  const readNotification = useMarkNotificationRead();

  const handleReadNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    readNotification.mutate(notification.id);
  };
  return (
    <Box
      key={notification.id}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="gray.800"
      _hover={{ bg: 'gray.700', cursor: 'pointer' }}
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
          <Icon
            as={AiOutlineEye}
            boxSize={7}
            color="teal.300"
            onClick={handleReadNotification}
            _hover={{ color: 'teal.500', cursor: 'pointer' }}
          />
        )}
      </Flex>
    </Box>
  );
};

export default NotificationCard;
