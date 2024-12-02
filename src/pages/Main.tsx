import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SidebarWithHeader from '../layouts/NavigationBar/SidebarwithHeader';
import { SortingOptionsProvider } from '../context/SortingOptionsContext';
import { CommentsSortingOptionsProvider } from '../context/CommentsSortingOptionsProvider';
const MainPage = () => {
  return (
    <SortingOptionsProvider>
      <CommentsSortingOptionsProvider>
        <Box minH="100vh">
          <SidebarWithHeader />
          <Box ml={{ base: 0, md: 60 }} p="0">
            <Outlet />
          </Box>
        </Box>
      </CommentsSortingOptionsProvider>
    </SortingOptionsProvider>
  );
};

export default MainPage;
