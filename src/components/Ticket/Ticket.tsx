import React from 'react';
import { Box, Text, HStack, Button } from '@chakra-ui/react';

interface TicketProps {
  id: number;
  discussionTitle: string;
  reason: string;
  status: string;
  reporter: string;
}

const Ticket: React.FC<TicketProps> = ({
  id,
  discussionTitle,
  reason,
  status,
  reporter,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="sm"
      bg="gray.700"
      color="white"
      _hover={{ shadow: 'md', bg: 'gray.600' }}
      width="100%"
      maxW="4xl"
    >
      <HStack justify="space-between">
        <Box>
          <Text fontWeight="bold" mb={2} color="white">
            Discussion: {discussionTitle}
          </Text>
          <Text color="gray.300">Reason: {reason}</Text>
          <Text color="gray.300">Status: {status}</Text>
          <Text color="gray.300">Reporter: {reporter}</Text>
        </Box>
        <Button
          size="sm"
          colorScheme="blue"
          bg="blue.500"
          _hover={{ bg: 'blue.400' }}
          onClick={() => {
            window.location.href = `/flagged-discussions/${id}`;
          }}
        >
          View Details
        </Button>
      </HStack>
    </Box>
  );
};

export default Ticket;
