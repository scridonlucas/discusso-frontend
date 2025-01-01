import { Box, Button, Heading, Text, Icon } from '@chakra-ui/react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const InvalidRoute = () => {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p={4}
    >
      <Icon as={FaExclamationTriangle} boxSize={16} color="gray.400" mb={4} />
      <Heading as="h1" fontSize="3xl" mb={2}>
        Page Not Found
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        The page you are looking for does not exist or may have been moved.
      </Text>
      <Button colorScheme="blue" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </Box>
  );
};

export default InvalidRoute;
