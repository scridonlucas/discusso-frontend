import React from 'react';
import { Box, Text, HStack, Badge, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
interface TicketProps {
  type: 'discussion' | 'comment';
  id: number;
  reportedItemId: number;
  reason: string;
  status: string;
  reporter: string;
  aiSeverityLevel?: number;
}

const Ticket: React.FC<TicketProps> = ({
  type,
  id,
  reportedItemId,
  reason,
  status,
  reporter,
  aiSeverityLevel,
}) => {
  const ticketLink =
    type === 'discussion'
      ? `/admin/flagged-discussions/${id}`
      : `/admin/flagged-comments/${id}`;

  return (
    <Box
      as={Link}
      to={ticketLink}
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      shadow="sm"
      bg="gray.800"
      color="white"
      _hover={{ shadow: 'xl', bg: 'gray.700', cursor: 'pointer' }}
      width="100%"
      maxW="4xl"
      transition="all 0.2s ease-in-out"
    >
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold" fontSize="lg" color="blue.300">
          Ticket {id}
        </Text>

        <Badge
          colorScheme="yellow"
          fontSize="0.9em"
          px={3}
          py={1}
          borderRadius="md"
        >
          {status}
        </Badge>
      </HStack>

      <VStack align="start" spacing={1}>
        <Text fontSize="md" color="gray.300">
          <Text as="span" fontWeight="semibold" color="blue.200">
            {type.charAt(0).toUpperCase() + type.slice(1)} ID:
          </Text>{' '}
          {reportedItemId}
        </Text>

        <Text fontSize="md" color="gray.300">
          <Text as="span" fontWeight="semibold" color="blue.200">
            Reason:
          </Text>{' '}
          {reason}
        </Text>

        <Text fontSize="md" color="gray.300">
          <Text as="span" fontWeight="semibold" color="blue.200">
            Reporter:
          </Text>{' '}
          {reporter}
        </Text>
        <Text
          fontSize="md"
          color={
            aiSeverityLevel === 1
              ? 'green.300'
              : aiSeverityLevel === 2
              ? 'orange.300'
              : aiSeverityLevel === 3
              ? 'red.300'
              : 'gray.500'
          }
        >
          <Text as="span" fontWeight="semibold" color="blue.200">
            Severity Level (AI):
          </Text>{' '}
          {aiSeverityLevel ? aiSeverityLevel : 'N/A'}
        </Text>
      </VStack>
    </Box>
  );
};

export default Ticket;
