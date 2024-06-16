'use client';

import {
  Box,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  Flex,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { useForm, SubmitHandler } from 'react-hook-form';

import { User } from '../../../types/userTypes';

import validationSchema from './validationSchema';

import {
  validateEmailExists,
  validateUsernameExists,
} from './customValidations';
import { useSignUp } from '../../../hooks/useSignUp';

const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm<User>();

  const signUpMutation = useSignUp();

  const validatePasswords = (value: string) => {
    if (watch('password') != value) {
      return 'Passwords do not match';
    }
  };

  const onSubmit: SubmitHandler<User> = async (data) => {
    const username = await validateUsernameExists(data.username);
    const email = await validateEmailExists(data.email);
    if (!username && !email) {
      signUpMutation.mutate(data);
    } else {
      if (username) {
        setError('username', {
          type: 'custom',
          message: 'This username is already taken!',
        });
      }
      if (email) {
        setError('email', {
          type: 'custom',
          message: 'This email is already in use! Please chose another email.',
        });
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
          <Flex gap={2}>
            <Box>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  {...register('firstName', validationSchema.firstName)}
                />
                <FormErrorMessage>
                  {errors.firstName && errors.firstName.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  {...register('lastName', validationSchema.lastName)}
                />
                <FormErrorMessage>
                  {errors.lastName && errors.lastName.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Flex>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              placeholder="Username"
              {...register('username', validationSchema.userName)}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              placeholder="Email"
              {...register('email', validationSchema.email)}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <Flex gap={2}>
            <FormControl isInvalid={!!errors.gender}>
              <FormLabel htmlFor="gender">Gender</FormLabel>
              <Select
                id="gender"
                placeholder="Select your gender"
                {...register('gender', {
                  required: 'Gender is required',
                })}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </Select>
              <FormErrorMessage>
                {errors.gender && errors.gender.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.birthDate}>
              <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
              <Input
                id="birthDate"
                type="date"
                placeholder="Birth Date"
                {...register('birthDate', validationSchema.birthDate)}
              />
              <FormErrorMessage>
                {errors.birthDate && errors.birthDate.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="firstName">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              {...register('password', validationSchema.password)}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="firstName">Confirm password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Confirmation of password in required',
                validate: validatePasswords,
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              type="submit"
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user?{' '}
              <Link as={ReactRouterLink} to="/login" color={'blue.400'}>
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
