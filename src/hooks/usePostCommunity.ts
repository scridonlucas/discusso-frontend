import communityService from '../services/communityService';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export const useAddCommunity = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to create this community. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: communityService.addCommunity,
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'Your community has been created.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['communities'],
      });
    },
    onError: handleError,
  });
};
