'use client';
import { SidebarContentAdmin } from './SideBar/SidebarContentAdmin';
import { Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import ResponsiveNavAdmin from './Header/ResponsiveNavAdmin';

const SidebarWithHeaderAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContentAdmin
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContentAdmin onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <ResponsiveNavAdmin onOpen={onOpen} />
    </>
  );
};

export default SidebarWithHeaderAdmin;
