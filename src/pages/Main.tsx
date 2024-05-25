import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SidebarWithHeader from '../layouts/NavigationBar/SidebarwithHeader';
import { Stack } from '@chakra-ui/react';
const MainPage = () => {
  return (
    <>
      <Box minH="100vh">
        <SidebarWithHeader />
        <Box ml={{ base: 0, md: 60 }} p="4">
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Outlet />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;
