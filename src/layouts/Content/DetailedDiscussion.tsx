import { useParams, Navigate } from 'react-router-dom';
import { Box, Flex, Stack, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import discussionService from '../../services/discussionService';
import ServerError from '../../components/MainPage/ServerError';
const DetailedDiscussion = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(
    ['discussion', id!],
    discussionService.getDiscussionById,
    {
      enabled: !!id,
    }
  );

  if (!id) {
    return <Navigate to="/home" />;
  }

  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError || !data) {
    return <ServerError />;
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width={'100%'} maxW={'5xl'} py={12} px={6}>
        <Box> test</Box>
      </Stack>
    </Flex>
  );
};

export default DetailedDiscussion;
