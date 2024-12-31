import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Text,
  Image,
} from '@chakra-ui/react';
import NavItem from './NavItem';
import { SidebarProps } from '../types';
import LinkItems from './LinkItems';
import logo from '../../../assets/images/discusso-logo.png';
import { Link } from 'react-router-dom';
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
        <Flex
          as={Link}
          to={'/home'}
          gap={4}
          alignItems="center"
          cursor="pointer"
          _hover={{
            transform: 'scale(1.1)',
            filter: 'brightness(1.2)',
            cursor: 'pointer',
          }}
        >
          <Image
            src={logo}
            alt="Discusso Logo"
            boxSize={{ base: '40px', md: '40px', lg: '40px' }}
            objectFit="contain"
            transition="transform 0.3s ease, filter 0.3s ease"
            _hover={{
              transform: 'scale(1.1)',
              filter: 'brightness(1.2)',
              cursor: 'pointer',
            }}
          />
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            Discusso
          </Text>
        </Flex>
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
