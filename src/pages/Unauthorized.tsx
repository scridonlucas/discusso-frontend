import { Box, Button, Heading, Text, Icon } from '@chakra-ui/react';
import { FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
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
      <Icon as={FaLock} boxSize={16} color="gray.400" mb={4} />
      <Heading as="h1" fontSize="3xl" mb={2}>
        Unauthorized Access
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={6}>
        You do not have permission to view this page.
      </Text>
      <Button colorScheme="blue" onClick={() => navigate('/')}>
        Return to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
