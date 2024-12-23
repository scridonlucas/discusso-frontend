import { Box, SimpleGrid } from '@chakra-ui/react';
import userService from '../../services/userService';
import discussionReportsService from '../../services/discussionReportsService';
import commentReportsService from '../../services/commentReportsService';
import discussionService from '../../services/discussionService';
import { useQuery } from '@tanstack/react-query';
import { DashboardCard } from '../../components/DashboardCard';

import { startOfWeek, endOfWeek, formatISO } from 'date-fns';

const AdminDashboard = () => {
  const {
    data: usersCountData,
    isLoading: usersCountIsLoading,
    isError: usersCountIsError,
  } = useQuery(['usersCount'], userService.getUsersCount);

  const {
    data: discussionsCountData,
    isLoading: discussionsCountIsLoading,
    isError: discussionsCountIsError,
  } = useQuery(['discussionsCount'], discussionService.getDiscussionsCount);

  const {
    data: newRegisteredUsersCountData,
    isLoading: newRegisteredUsersCountIsLoading,
    isError: newRegisteredUsersCountIsError,
  } = useQuery(
    [
      'newRegisteredUsersCount',
      'ACTIVE',
      formatISO(startOfWeek(new Date(), { weekStartsOn: 1 }), {
        representation: 'complete',
      }),
      formatISO(endOfWeek(new Date(), { weekStartsOn: 1 }), {
        representation: 'complete',
      }),
    ],
    userService.getUsersCount
  );

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
        <DashboardCard
          isLoading={usersCountIsLoading}
          isError={usersCountIsError}
          loadingTitle="Loading Total Users..."
          errorTitle="Error loading Total Users"
          title="Total users"
          value={usersCountData}
          bgColor="purple.500"
          hoverColor="purple.600"
          textColor="white"
        />
        <DashboardCard
          isLoading={newRegisteredUsersCountIsLoading}
          isError={newRegisteredUsersCountIsError}
          loadingTitle="Loading New Registered Users..."
          errorTitle="Error loading New Registered Users"
          title="New Registered Users"
          value={newRegisteredUsersCountData}
          bgColor="blue.500"
          hoverColor="blue.600"
          textColor="white"
        />
        <DashboardCard
          isLoading={discussionsCountIsLoading}
          isError={discussionsCountIsError}
          loadingTitle="Loading Discussions..."
          errorTitle="Error loading Discussions"
          title="Discussions"
          value={discussionsCountData}
          bgColor="green.500"
          hoverColor="green.600"
          textColor="white"
        />
        <DashboardCard
          isLoading={
            discussionReportsCountIsLoading || commentReportsCountIsLoading
          }
          isError={discussionReportsCountIsError || commentReportsCountIsError}
          loadingTitle="Loading Pending Tickets..."
          errorTitle="Error loading Pending Tickets"
          title="Pending Tickets"
          value={
            (discussionReportsCountData ?? 0) + (commentReportsCountData ?? 0)
          }
          bgColor="red.500"
          hoverColor="red.600"
          textColor="white"
        />
      </SimpleGrid>
    </Box>
  );
};

export default AdminDashboard;
