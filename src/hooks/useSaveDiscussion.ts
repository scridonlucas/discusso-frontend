import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import bookmarkDiscussionService from '../services/bookmarkDiscussionService';
import { AxiosError } from 'axios';
import { Discussion as DiscussionType } from '../types/discussionTypes';

type PaginatedDiscussions = InfiniteData<{
  discussions: DiscussionType[];
  nextPage?: number | null;
}>;

export const useSaveDiscussion = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'An error occurred while saving the discussion.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const succesToast = (message: string) => {
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const addBookmark = useMutation({
    mutationFn: bookmarkDiscussionService.addBookmark,
    onSuccess: (bookmarkData) => {
      queryClient.setQueryData<PaginatedDiscussions>(
        ['discussions'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              discussions: page.discussions.map((discussion) => {
                if (discussion.id === bookmarkData.discussionId) {
                  return {
                    ...discussion,
                    bookmarks: [
                      ...discussion.bookmarks,
                      {
                        user: {
                          id: bookmarkData.userId,
                          username: 'currentUser',
                        },
                      },
                    ],
                  };
                }
                return discussion;
              }),
            })),
          };
        }
      );
      succesToast('Discussion saved!');
    },
    onError: handleError,
  });

  const removeBookmark = useMutation({
    mutationFn: bookmarkDiscussionService.removeBookmark,
    onSuccess: (bookmarkData) => {
      queryClient.setQueryData<PaginatedDiscussions>(
        ['discussions'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              discussions: page.discussions.map((discussion) => {
                if (discussion.id === bookmarkData.discussionId) {
                  return {
                    ...discussion,
                    bookmarks: discussion.bookmarks.filter(
                      (bookmark) => bookmark.user.id !== bookmarkData.userId
                    ),
                  };
                }
                return discussion;
              }),
            })),
          };
        }
      );
      succesToast('Discussion no longer in your saved list!');
    },
    onError: handleError,
  });

  return { addBookmark, removeBookmark };
};
