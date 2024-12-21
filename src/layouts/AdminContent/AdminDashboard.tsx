import { Flex, Text, Box } from '@chakra-ui/react';
import userService from '../../services/userService';
import { useQuery } from '@tanstack/react-query';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import ServerError from '../../components/MainPage/ServerError';
const AdminDashboard = () => {
  const { data, isLoading, isError } = useQuery(
    ['usersCount'],
    userService.getUsersCount
  );

  if (isLoading) {
    return (
      <Flex
        align={'center'}
        flexDirection={'column'}
        gap={'3vh'}
        justify={'center'}
        alignItems={'center'}
        minH={'100vh'}
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="white">
          Just a moment! We're gathering all the latest reports...
        </Text>
      </Flex>
    );
  }

  if (isError) {
    return <ServerError />;
  }
  return (
    <Flex gap="4" p="8">
      <DashboardCard
        title="Total users"
        value={data}
        bgColor="teal.500"
        hoverColor="teal.600"
        textColor="white"
      />
      <DashboardCard
        title="Total users"
        value={data}
        bgColor="purple.500"
        hoverColor="purple.600"
        textColor="white"
      />
    </Flex>
  );
};

export default AdminDashboard;
