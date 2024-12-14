import { useParams, Navigate } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import ServerError from '../../components/MainPage/ServerError';
import { useQuery } from '@tanstack/react-query';
import discussionReportsService from '../../services/discussionReportsService';

const DetailedCommentTicket = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(
    ['commentTicket', Number(id)!],
    discussionReportsService.getDiscussionReportById,
    {
      enabled: !!id,
    }
  );

  if (!id) {
    return <Navigate to="/admin/flagged-comments" />;
  }

  if (!id) {
    return <Navigate to="/admin/flagged-discussions" />;
  }

  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  return <Flex align="center" justify="center"></Flex>;
};

export default DetailedCommentTicket;
