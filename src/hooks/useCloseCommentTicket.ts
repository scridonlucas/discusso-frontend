import { useMutation } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import commentReportsService from '../services/commentReportsService';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

export const useCloseCommentTicket = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'There was an error closing this ticket. Please try again.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: commentReportsService.closeCommentReportTicket,
    onSuccess: () => {
      toast({
        title: 'Discussion created!',
        description:
          'The comment report has been resolved and the necessary actions have been taken.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['discussionTickets'],
      });
      queryClient.invalidateQueries({
        queryKey: ['moderationLogs'],
      });

      navigate('/admin/flagged-comments');
    },
    onError: handleError,
  });
};
