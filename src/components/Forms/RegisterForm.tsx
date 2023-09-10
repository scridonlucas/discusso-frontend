'use client';

import {
  Box,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}
    >
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
          handleChange={handleChange}
        />

        <InputField
          id="phoneNumber"
          isRequired={true}
          labelName="Phone Number"
          name="phoneNumber"
          type="tel"
          value={formData.phoneNumber}
          handleChange={handleChange}
        />

        <InputField
          id="password"
          isRequired={true}
          labelName="Password"
          name="password"
          type="password"
          value={formData.password}
          handleChange={handleChange}
        />

        <Stack spacing={10} pt={2}>
          <Button
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
    </Box>
  );
};

export default RegistrationForm;
