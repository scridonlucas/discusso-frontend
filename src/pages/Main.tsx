import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SidebarWithHeader from '../layouts/NavigationBar/SidebarwithHeader';

const MainPage = () => {
  return (
    <>
      <Box minH="100vh">
        <SidebarWithHeader />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
