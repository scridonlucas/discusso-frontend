import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SidebarWithHeaderAdmin from '../layouts/NavigationBarAdmin/SidebarwithHeaderAdmin';
const AdminPage = () => {
  return (
    <Box minH="100vh">
      <SidebarWithHeaderAdmin />
      <Box ml={{ base: 0, md: 60 }} p="0">
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminPage;
