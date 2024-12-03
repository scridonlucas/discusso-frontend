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

type PaginatedComments = {
  comments: Comment[];
  nextCursor?: number | null;
};

export const useLikeComment = () => {};
