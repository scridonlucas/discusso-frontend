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
} from '@chakra-ui/react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { User } from '../../../types';

import validationSchema from './validationSchema';

const RegistrationForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
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
          <HStack>
            <Box>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="FirstName"
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
          </HStack>

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
