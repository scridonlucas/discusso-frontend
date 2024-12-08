import commentDiscussionService from '../services/commentDiscussionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useToast } from '@chakra-ui/react';
export const useReportComment = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'An error occurred while reporting the discussion.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return useMutation({
    mutationFn: commentDiscussionService.addCommentReport,
    onSuccess: () => {
      toast({
        title: 'Successfully reported comment!',
        description: 'Your report has been successfully submitted.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      queryClient.invalidateQueries({
        queryKey: ['commentReports'],
      });
    },
    onError: handleError,
  });
};
