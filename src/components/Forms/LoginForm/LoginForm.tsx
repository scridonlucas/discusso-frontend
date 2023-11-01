import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  Link,
  Button,
} from '@chakra-ui/react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Link as ReactRouterLink } from 'react-router-dom';

import { useColorModeValue } from '@chakra-ui/react';

import { LoginUser } from '../../../types';

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<LoginUser>();

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" />
        </FormControl>

        <Stack spacing={10}>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox>Remember me</Checkbox>
            <Text>
              New here?{' '}
              <Link as={ReactRouterLink} to="/signup" color={'blue.400'}>
                Sign up!
              </Link>
            </Text>
          </Stack>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoginForm;
