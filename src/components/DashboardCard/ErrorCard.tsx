import { Box, Text, Button } from '@chakra-ui/react';

interface ErrorCardProps {
  title: string;
  onRetry?: () => void;
}

const ErrorCard = ({ title, onRetry }: ErrorCardProps) => {
  return (
    <Box
      p="6"
      bg="red.500"
      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
      color="white"
      _hover={{
        transform: 'none',
        bg: 'red.600',
      }}
    >
      <Text fontSize="lg" fontWeight="bold" mb="4">
        {title}
      </Text>
      <Text fontSize="sm" mb="4">
        Something went wrong. Please try again.
      </Text>
      {onRetry && (
        <Button size="sm" colorScheme="red" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorCard;
