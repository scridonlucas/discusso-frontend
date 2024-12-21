import { Flex } from '@chakra-ui/react';
import userService from '../../services/userService';
import discussionReportsService from '../../services/discussionReportsService';
import { useQuery } from '@tanstack/react-query';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import ServerError from '../../components/MainPage/ServerError';
import ServerLoading from '../../components/MainPage/ServerLoading';
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

  if (usersCountIsLoading || discussionReportsCountIsLoading) {
    return <ServerLoading />;
  }

  if (usersCountIsError || discussionReportsCountIsError) {
    return <ServerError />;
  }
  return (
    <Flex gap="6" align={'center'} justify={'center'} marginTop={6}>
      <DashboardCard
        title="Pending Flagged Discussions"
        value={discussionReportsCountData}
        bgColor="teal.500"
        hoverColor="teal.600"
        textColor="white"
      />
      <DashboardCard
        title="Comments Pending Tickets"
        value={0}
        bgColor="teal.500"
        hoverColor="teal.600"
        textColor="white"
      />
      <DashboardCard
        title="Total users"
        value={usersCountData}
        bgColor="purple.500"
        hoverColor="purple.600"
        textColor="white"
      />
    </Flex>
  );
};

export default AdminDashboard;
