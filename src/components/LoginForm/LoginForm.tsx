import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Text,
  Button,
} from '@chakra-ui/react';

const LoginForm = () => {
  return (
    <Box rounded={'lg'} boxShadow={'lg'} p={8}>
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
              <Text as="button" display="inline" color={'blue.400'}>
                Sign up!
              </Text>
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
