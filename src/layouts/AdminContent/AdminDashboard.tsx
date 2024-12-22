import { Flex, Box, SimpleGrid } from '@chakra-ui/react';
import userService from '../../services/userService';
import discussionReportsService from '../../services/discussionReportsService';
import commentReportsService from '../../services/commentReportsService';
import { useQuery } from '@tanstack/react-query';
import {
  DashboardCard,
  ErrorCard,
  LoadingCard,
} from '../../components/DashboardCard';

const AdminDashboard = () => {
  const {
    data: usersCountData,
    isLoading: usersCountIsLoading,
    isError: usersCountIsError,
  } = useQuery(['usersCount'], userService.getUsersCount);

  const {
    data: discussionReportsCountData,
    isLoading: discussionReportsCountIsLoading,
    isError: discussionReportsCountIsError,
  } = useQuery(
    ['discussionReportsCount'],
    discussionReportsService.getDiscussionReportsCount
  );

  const {
    data: commentReportsCountData,
    isLoading: commentReportsCountIsLoading,
    isError: commentReportsCountIsError,
  } = useQuery(
    ['commentReportsCount'],
    commentReportsService.getCommentReportsCount
  );

  return (
    <Box p={6}>
      <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={6}>
        {usersCountIsLoading ? (
          <LoadingCard title="Loading Total Users..." />
        ) : usersCountIsError ? (
          <ErrorCard title="Error loading Total Users" />
        ) : (
          <DashboardCard
            title="Total users"
            value={usersCountData}
            bgColor="purple.500"
            hoverColor="purple.600"
            textColor="white"
          />
        )}
        {discussionReportsCountIsLoading || commentReportsCountIsLoading ? (
          <LoadingCard title="Loading Pending Tickets..." />
        ) : discussionReportsCountIsError || commentReportsCountIsError ? (
          <ErrorCard title="Error loading Pending Tickets" />
        ) : (
          <DashboardCard
            title="Pending Tickets"
            value={discussionReportsCountData + commentReportsCountData}
            bgColor="teal.500"
            hoverColor="teal.600"
            textColor="white"
          />
        )}
      </SimpleGrid>
    </Box>
  );
};

export default AdminDashboard;
