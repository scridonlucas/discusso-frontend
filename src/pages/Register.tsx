import { Flex, Stack, Heading, Text } from '@chakra-ui/react';
import RegistrationForm from '../components/Forms/RegisterForm';

const Register = () => {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            Join the Community and Get Started
          </Text>
        </Stack>
        <RegistrationForm />
      </Stack>
    </Flex>
  );
};

export default Register;
