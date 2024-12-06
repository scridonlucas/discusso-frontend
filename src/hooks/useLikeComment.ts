import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import commentDiscussionService from '../services/commentDiscussionService';
import { Comment } from '../types/commonTypes';
import { useCommentsSortingOptions } from './useCommentsSortingOptions';
import {
  NewCommentLikeResponse,
  RemovedCommentLikeResponse,
} from '../types/commonTypes';

type PaginatedComments = InfiniteData<{
  comments: Comment[];
  nextCursor?: number | null;
}>;

type MutateVariables = {
  commentId: number;
  discussionId: number;
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { sortCriteria } = useCommentsSortingOptions();

  const handleError = (error: unknown) => {
    const errorMessage =
      error instanceof AxiosError && error.response?.data?.error
        ? error.response.data.error
        : 'An error occurred while liking the comment.';
    toast({
      title: 'Error',
      description: errorMessage,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const likeComment = useMutation<
    NewCommentLikeResponse,
    Error,
    MutateVariables
  >({
    mutationFn: async ({ commentId }) => {
      return commentDiscussionService.addCommentLike(commentId);
    },
    onSuccess: (likeData, variables) => {
      const { discussionId } = variables;

      queryClient.setQueryData<PaginatedComments>(
        ['comments', discussionId, sortCriteria],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((comment) => {
                if (comment.id === likeData.commentId) {
                  return {
                    ...comment,
                    likes: [
                      ...comment.likes,
                      {
                        user: {
                          id: likeData.userId,
                          username: likeData.user.username,
                        },
                      },
                    ],
                    _count: {
                      ...comment._count,
                      likes: comment._count.likes + 1,
                    },
                  };
                }
                return comment;
              }),
            })),
          };
        }
      );
    },
    onError: handleError,
  });

  const unlikeComment = useMutation<
    RemovedCommentLikeResponse,
    Error,
    MutateVariables
  >({
    mutationFn: async ({ commentId }) => {
      return commentDiscussionService.deleteCommentLike(commentId);
    },
    onSuccess: (likeData, variables) => {
      const { discussionId } = variables;

      queryClient.setQueryData<PaginatedComments>(
        ['comments', discussionId, sortCriteria],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              comments: page.comments.map((comment) => {
                if (comment.id === likeData.commentId) {
                  return {
                    ...comment,
                    likes: comment.likes.filter(
                      (like) => like.user.id !== likeData.userId
                    ),
                    _count: {
                      ...comment._count,
                      likes: comment._count.likes - 1,
                    },
                  };
                }
                return comment;
              }),
            })),
          };
        }
      );
    },
    onError: handleError,
  });

  return { likeComment, unlikeComment };
};
