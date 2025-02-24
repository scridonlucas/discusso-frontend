'use client';
import { SidebarContent } from './SideBar/SidebarContent';
import { Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react';
import ResponsiveNav from './Header/ResponsiveNav';

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <ResponsiveNav onOpen={onOpen} />
    </>
  );
};

export default SidebarWithHeader;
