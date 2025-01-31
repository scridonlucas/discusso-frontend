import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Link,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Link as ReactRouterLink } from 'react-router-dom';

import { useColorModeValue } from '@chakra-ui/react';

import { LoginUser } from '../../../types/userTypes';

import validationSchema from '../RegisterForm/validationSchema';
import { useSignIn } from '../../../hooks/useSignIn';

import { testCredentials } from '../../../features/auth/testCredentials';
const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginUser>();

  const signInMutation = useSignIn();

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    signInMutation.mutate(data);
  };

  const handleTestSignIn = () => {
    signInMutation.mutate(testCredentials);
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
              justify={'center'}
            >
              <Text>
                New here?{' '}
                <Link as={ReactRouterLink} to="/signup" color={'blue.400'}>
                  Sign up!
                </Link>
              </Text>
            </Stack>
            <Stack spacing={5}>
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
              <Button
                onClick={handleTestSignIn}
                loadingText="Submitting"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Vistor Sign In
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
