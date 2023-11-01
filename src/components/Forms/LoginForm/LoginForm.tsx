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
  FormErrorMessage,
} from '@chakra-ui/react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Link as ReactRouterLink } from 'react-router-dom';

import { useColorModeValue } from '@chakra-ui/react';

import { LoginUser } from '../../../types';

import loginService from '../../../services/loginService';
import { AxiosError } from 'axios';

import validationSchema from '../RegisterForm/validationSchema';
const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginUser>();

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    try {
      const user = await loginService.postLogin(data);
      loginService.storeLogin(user);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 401) {
          setError('email', {
            type: 'custom',
          });
          setError('password', {
            type: 'custom',
            message: 'Incorrent email address or password!',
          });
        }
      } else {
        alert('Network Error!'); // will implement a better notification system!
      }
    }
  };

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="email" isInvalid={!!errors.email}>
            <FormLabel>Email address</FormLabel>
            <Input
              id="email"
              placeholder="Email"
              {...register('email', validationSchema.email)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
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
              type="submit"
              loadingText="Submitting"
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
      </form>
    </Box>
  );
};

export default LoginForm;
