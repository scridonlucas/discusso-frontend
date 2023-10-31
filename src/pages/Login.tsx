import { Flex } from '@chakra-ui/react';
import LoginForm from '../components/Forms/LoginForm/LoginForm';
import { Stack, Text, Heading } from '@chakra-ui/react';
const Login = () => {
  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to Discusso</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            and dive into the world of lively discussions ☕
          </Text>
        </Stack>
        <LoginForm />
      </Stack>
    </Flex>
  );
};

export default Login;
