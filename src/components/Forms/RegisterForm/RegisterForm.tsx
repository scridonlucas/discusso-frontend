'use client';

import {
  Box,
  HStack,
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

import { useForm, SubmitHandler } from 'react-hook-form';

import { User } from '../../../types';

import validationSchema from './validationSchema';

const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<User>();

  const validatePasswords = (value: string) => {
    if (watch('password') != value) {
      return 'Passwords do no match';
    }
  };

  const validateBirthDate = (value: string) => {
    const currentDate = new Date();
    const userBirthDate = new Date(value);
    console.log(value);
    const age = currentDate.getFullYear() - userBirthDate.getFullYear();
    if (age < 16) {
      return 'User must be at least 16 years old.';
    }

    if (age > 130) {
      return 'Invalid date';
    }
    return true;
  };

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    console.log(typeof data.birthDate);
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
            <FormLabel htmlFor="firstName">Email</FormLabel>
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
                {...register('birthDate', {
                  required: 'Birth Date is required.',
                  validate: validateBirthDate,
                })}
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
              Already a user? <Link color={'blue.400'}>Login</Link>
            </Text>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default RegistrationForm;
