import { Box, Text, Spinner } from '@chakra-ui/react';

const LoadingCard = ({ title }: { title: string }) => {
  return (
    <Box
      p="6"
      bg="gray.200"
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      color="gray.600"
      _hover={{
        transform: 'none',
        bg: 'gray.300',
      }}
    >
      <Text fontSize="md" fontWeight="bold" mb="4">
        {title}
      </Text>
      <Spinner size="md" />
    </Box>
  );
};

export default LoadingCard;
