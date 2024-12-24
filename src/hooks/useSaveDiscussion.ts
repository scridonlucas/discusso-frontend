import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import bookmarkDiscussionService from '../services/bookmarkDiscussionService';
import { AxiosError } from 'axios';
import { Discussion as DiscussionType } from '../types/discussionTypes';
import { NewBookmarkResponse } from '../types/commonTypes';
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

  const successToast = (message: string) => {
    toast({
      title: 'Success',
      description: message,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const updateBookmarkInCache = (
    oldData: PaginatedDiscussions | undefined,
    bookmarkData: NewBookmarkResponse,
    isAdd: boolean
  ): PaginatedDiscussions | undefined => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      pages: oldData.pages.map((page) => ({
        ...page,
        discussions: page.discussions.map((discussion) => {
          if (discussion.id === bookmarkData.discussionId) {
            const isAlreadyBookmarked = discussion.bookmarks.some(
              (bookmark) => bookmark.user.id === bookmarkData.userId
            );

            if (isAdd && !isAlreadyBookmarked) {
              return {
                ...discussion,
                bookmarks: [
                  ...discussion.bookmarks,
                  {
                    user: {
                      id: bookmarkData.userId,
                      username: bookmarkData.user.username,
                    },
                  },
                ],
              };
            } else if (!isAdd && isAlreadyBookmarked) {
              return {
                ...discussion,
                bookmarks: discussion.bookmarks.filter(
                  (bookmark) => bookmark.user.id !== bookmarkData.userId
                ),
              };
            }
          }
          return discussion;
        }),
      })),
    };
  };

  const addBookmark = useMutation({
    mutationFn: bookmarkDiscussionService.addBookmark,
    onSuccess: (bookmarkData: NewBookmarkResponse) => {
      const queries = queryClient.getQueryCache().findAll({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === 'discussions',
      });

      queries.forEach(({ queryKey }) => {
        queryClient.setQueryData<PaginatedDiscussions | undefined>(
          queryKey,
          (oldData) => updateBookmarkInCache(oldData, bookmarkData, true)
        );
      });

      queryClient.setQueryData<DiscussionType>(
        ['discussion', bookmarkData.discussionId],
        (oldDiscussion) => {
          if (!oldDiscussion) return oldDiscussion;

          const isAlreadyBookmarked = oldDiscussion.bookmarks.some(
            (bookmark) => bookmark.user.id === bookmarkData.userId
          );

          if (isAlreadyBookmarked) return oldDiscussion;

          return {
            ...oldDiscussion,
            bookmarks: [
              ...oldDiscussion.bookmarks,
              {
                user: {
                  id: bookmarkData.userId,
                  username: bookmarkData.user.username,
                },
              },
            ],
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: ['trendingDiscussions'],
      });

      successToast('Discussion saved!');
    },
    onError: handleError,
  });

  const removeBookmark = useMutation({
    mutationFn: bookmarkDiscussionService.removeBookmark,
    onSuccess: (bookmarkData: NewBookmarkResponse) => {
      // Find all queries that start with 'discussions'
      const queries = queryClient.getQueryCache().findAll({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === 'discussions',
      });

      queries.forEach(({ queryKey }) => {
        queryClient.setQueryData<PaginatedDiscussions | undefined>(
          queryKey,
          (oldData) => updateBookmarkInCache(oldData, bookmarkData, false)
        );
      });

      // Update individual discussion cache
      queryClient.setQueryData<DiscussionType>(
        ['discussion', bookmarkData.discussionId],
        (oldDiscussion) => {
          if (!oldDiscussion) return oldDiscussion;

          return {
            ...oldDiscussion,
            bookmarks: oldDiscussion.bookmarks.filter(
              (bookmark) => bookmark.user.id !== bookmarkData.userId
            ),
          };
        }
      );

      queryClient.invalidateQueries({
        queryKey: ['trendingDiscussions'],
      });

      successToast('Discussion no longer in your saved list!');
    },
    onError: handleError,
  });

  return { addBookmark, removeBookmark };
};
