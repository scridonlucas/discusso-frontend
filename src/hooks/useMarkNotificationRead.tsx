import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import notificationService from '../services/notificationService';
import { AxiosError } from 'axios';

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to mark this notification or all notifications as read. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: notificationService.readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['notificationsCount']);
      toast({
        title: 'Success!',
        description: `You've read this notification.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to unfollow this user. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: notificationService.readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['notificationsCount']);

      toast({
        title: 'Success!',
        description: `You've read all notifications.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};
