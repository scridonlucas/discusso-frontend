'use client';

import {
  Box,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

import InputField from './common/InputField';

import { useState } from 'react';
import { User } from '../../types';

const RegistrationForm = () => {
  const [formData, setFormData] = useState<User>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <HStack>
            <Box>
              <InputField
                id="firstName"
                isRequired={true}
                labelName="First Name"
                name="firstName"
                type="text"
                value={formData.firstName}
                errorMessage=""
                handleChange={handleChange}
              />
            </Box>
            <Box>
              <InputField
                id="lastName"
                isRequired={true}
                labelName="Last Name"
                name="lastName"
                type="text"
                value={formData.lastName}
                errorMessage=""
                handleChange={handleChange}
              />
            </Box>
          </HStack>
          <InputField
            id="email"
            isRequired={true}
            labelName="Email"
            name="email"
            type="email"
            value={formData.email}
            errorMessage=""
            handleChange={handleChange}
          />

          <InputField
            id="phoneNumber"
            isRequired={true}
            labelName="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            errorMessage=""
            handleChange={handleChange}
          />

          <FormControl id="gender" isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={formData.gender}
              placeholder="Select option"
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>

          <InputField
            id="password"
            isRequired={true}
            labelName="Password"
            name="password"
            type="password"
            value={formData.password}
            errorMessage=""
            handleChange={handleChange}
          />

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
