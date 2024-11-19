import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
const CommentsSectionError: React.FC = () => {
  return (
    <Flex
      align="center"
      justify="center"
      py={4}
      flexDirection={'column'}
      alignItems={'center'}
    >
      <Icon as={FiAlertTriangle} w={10} h={10} color="red.500" mb={4} />
      <Text fontSize="xl" color="red.500" fontWeight="bold" mb={2}>
        Oops! Something went wrong.
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6} textAlign="center" maxW="sm">
        We encountered an unexpected error while trying to gather comments from
        our servers. Please try refreshing the page, or contact support if the
        problem persists.
      </Text>
      <Button onClick={() => window.location.reload()} size="md">
        Refresh Page
      </Button>
    </Flex>
  );
};

export default CommentsSectionError;
