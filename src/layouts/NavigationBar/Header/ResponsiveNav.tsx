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
  Badge,
  Image,
} from '@chakra-ui/react';
import { FiMenu, FiBell, FiChevronDown, FiPlus } from 'react-icons/fi';
import { MobileProps } from '../types';
import { useSignOut } from '../../../hooks/useSignOut';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { AuthResponse } from '../../../types/authTypes';
import { useNavigate } from 'react-router-dom';
import notificationService from '../../../services/notificationService';
import logo from '../../../assets/images/discusso-logo.png';

const ResponsiveNav = ({ onOpen, ...rest }: MobileProps) => {
  const queryClient = useQueryClient();
  const queryData = queryClient.getQueryData<AuthResponse>(['auth']);

  const {
    data: notificationsCount = 0,
    isLoading: notificationsCountIsLoading,
    isError: notificationsCountIsError,
  } = useQuery(
    ['notificationsCount'],
    notificationService.gatherNotificationsCount,
    {
      refetchInterval: 300000, // 5 mins
    }
  );
  console.log('notificationsCount', notificationsCount);
  const navigate = useNavigate();

  const username = queryData ? queryData.user.username : '';
  const role = queryData ? queryData.user.role : '';
  const roleDisplay = role.charAt(0) + role.slice(1).toLowerCase();

  const signOutMutation = useSignOut();

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  const handleCreateDiscussion = () => {
    navigate('/create');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  const handleNotifications = () => {
    navigate('/notifications');
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

        <Image
          src={logo}
          alt="Discusso Logo"
          display={{ base: 'flex', md: 'none' }}
          boxSize={{ base: '25px' }}
          objectFit="contain"
          transition="transform 0.3s ease, filter 0.3s ease"
          _hover={{
            transform: 'scale(1.1)',
            filter: 'brightness(1.2)',
            cursor: 'pointer',
          }}
        />
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/* Responsive create post button example */}
        {/* Button with a text for medium to big screens */}
        <Button
          display={{ base: 'none', md: 'flex' }}
          leftIcon={<FiPlus />}
          size={'lg'}
          variant={'ghost'}
          onClick={handleCreateDiscussion}
          gap={'1'}
        >
          <Text>Start a new discussion</Text>
        </Button>
        {/* Icon only for small screens */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          size="lg"
          onClick={handleCreateDiscussion}
          variant="ghost"
          aria-label="open menu"
          icon={<FiPlus />}
        />
        <Box position="relative">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open notifications"
            icon={<FiBell />}
            onClick={handleNotifications}
          />
          {!notificationsCountIsLoading &&
            !notificationsCountIsError &&
            notificationsCount > 0 && (
              <Badge
                position="absolute"
                top="0.5"
                right="1"
                fontSize="0.7em"
                colorScheme="red"
                bg="red.500"
                borderRadius="full"
              >
                {notificationsCount}
              </Badge>
            )}
        </Box>
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
                <MenuItem onClick={handleAdminDashboard}>
                  Admin Dashboard
                </MenuItem>
              )}
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default ResponsiveNav;
