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
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { MobileProps } from '../types';
import { useSignOut } from '../../../hooks/useSignOut';
import { useQueryClient } from '@tanstack/react-query';
import { AuthResponse } from '../../../types/authTypes';
import { useNavigate } from 'react-router-dom';
const ResponsiveNavAdmin = ({ onOpen, ...rest }: MobileProps) => {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<AuthResponse>(['auth']);
  const navigate = useNavigate();

  const username = queryData ? queryData.user.username : '';
  const role = queryData ? queryData.user.role : '';
  const roleDisplay = role.charAt(0) + role.slice(1).toLowerCase();

  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  const handleHomePage = () => {
    navigate('/home');
  };

  const handleProfile = () => {
    navigate('/profile');
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
      <Flex alignItems="center" gap={4}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
          alignContent={'center'}
        />
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          ☕
        </Text>
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* Responsive create post button example */}
        {/* Button with a text for medium to big screens */}

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
                  ml="2"
                  size={'sm'}
                  name={username}
                  bg="teal.400"
                  color="black"
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {roleDisplay}
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
              <MenuItem onClick={handleProfile}>Profile</MenuItem>

              <MenuDivider />
              {role === 'ADMIN' && (
                <MenuItem onClick={handleHomePage}>Discusso Home</MenuItem>
              )}
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default ResponsiveNavAdmin;
