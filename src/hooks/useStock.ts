import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import stockService from '../services/stockService';
import { AxiosError } from 'axios';

export const useAddStockToFavorites = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to add a new stock to favorites. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: stockService.postFavoriteStock,
    onSuccess: () => {
      queryClient.invalidateQueries(['stocks']);

      toast({
        title: 'Success!',
        description: `You added this stock to your favorites.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};

export const useRemoveStockFromFavorites = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error trying to remove this stock. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: stockService.deleteFavoriteStock,
    onSuccess: () => {
      queryClient.invalidateQueries(['stocks']);
      toast({
        title: 'Success!',
        description: `You removed this stock from your favorites.`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    },
    onError: handleError,
  });
};
