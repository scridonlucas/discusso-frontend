import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import commentDiscussionService from '../../services/commentDiscussionService';
const CommentsSection = ({ discussionId }: { discussionId: number }) => {
  const [sortCriteria, useSortCriteria] = useState<string>('recent');

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery(
      ['comments', discussionId, sortCriteria],
      commentDiscussionService.gatherComments,
      {
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
      }
    );

  console.log(discussionId, useSortCriteria);
  return <></>;
};

export default CommentsSection;
