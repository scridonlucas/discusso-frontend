import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { SidebarProps } from '../types';
import LinkItems from './LinkItems';
import { FaShieldAlt } from 'react-icons/fa';

import { Icon } from '@chakra-ui/react';
export const SidebarContentAdmin = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="xl"
          fontFamily="monospace"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={2}
        >
          <Icon as={FaShieldAlt} />
          Admin Panel
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};
