import { Flex, Icon, Text, Button } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';

const ServerError = () => {
  return (
    <Flex
      align="center"
      justify="center"
      height="100vh"
      direction="column"
      p={6}
    >
      <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" mb={4} />
      <Text fontSize="2xl" color="red.500" fontWeight="bold" mb={2}>
        Oops! Something went wrong.
      </Text>
      <Text fontSize="md" color="gray.600" mb={6} textAlign="center" maxW="sm">
        We encountered an unexpected error while trying to gather data from our
        servers. Please try refreshing the page, or contact support if the
        problem persists.
      </Text>
      <Button onClick={() => window.location.reload()} size="lg">
        Refresh Page
      </Button>
    </Flex>
  );
};

export default ServerError;
