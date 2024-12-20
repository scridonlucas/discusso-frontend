import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import userService from '../services/userService';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to update this user role. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: userService.updateUserRole,
    onSuccess: () => {
      toast({
        title: 'Updated user role!',
        description: 'User role updated successfully.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: handleError,
  });
};
