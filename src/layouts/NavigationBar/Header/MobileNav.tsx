import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Button,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown, FiPlus } from 'react-icons/fi';
import { MobileProps } from '../types';
import { useSignOut } from '../../../hooks/useSignOut';
import { useQueryClient } from '@tanstack/react-query';
import { AuthResponse } from '../../../types/authTypes';
import { useNavigate } from 'react-router-dom';

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<AuthResponse>(['auth']);
  const navigate = useNavigate();

  const username = queryData ? queryData.user.username : '';
  const role = queryData ? queryData.user.role : '';

  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  const handleCreateDiscussion = () => {
    navigate('/create');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: '', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        ☕ Discusso
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Box
          as={Button}
          size={'lg'}
          variant={'ghost'}
          onClick={handleCreateDiscussion}
          display={'flex'}
          alignItems="center"
          gap={'4'}
        >
          <FiPlus />
          Start a new discussion
        </Box>

        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.700')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
