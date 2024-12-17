import { useParams, Navigate } from 'react-router-dom';
import {
  Flex,
  Spinner,
  Box,
  Stack,
  HStack,
  Text,
  Badge,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import discussionReportsService from '../../services/discussionReportsService';
import ServerError from '../../components/MainPage/ServerError';
import { useCloseDiscussionTicket } from '../../hooks/useCloseDiscussionTicket';
import { useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';

const DetailedDiscussionTicket = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(
    ['discussionTickets', Number(id)!],
    discussionReportsService.getDiscussionReportById,
    {
      enabled: !!id,
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const closeDiscussionTicket = useCloseDiscussionTicket();

  if (!id) {
    return <Navigate to="/admin/flagged-discussions" />;
  }

  if (isLoading) {
    return (
      <Flex align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <ServerError />;
  }

  const handleOpenModalClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onOpen();
  };

  const handleCloseTicket = (action: string) => {
    closeDiscussionTicket.mutate(
      { reportId: data.id, action },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Flex align="center" justify="center">
      <Stack spacing={8} width="100%" maxW="5xl" py={12} px={6}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          boxShadow="lg"
          bg="gray.800"
          color="white"
        >
          {/* Header */}
          <HStack justify="space-between" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="blue.300">
              Ticket {data.id}
            </Text>
            <Badge
              colorScheme="yellow"
              fontSize="0.9em"
              px={3}
              py={1}
              borderRadius="md"
            >
              {data.status}
            </Badge>
          </HStack>

          {/* Details Section */}
          <VStack align="start" spacing={4} mb={6}>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Discussion Title:
              </Text>{' '}
              <Text
                as={Link}
                to={`/discussions/${data.discussion.id}`}
                color="gray.200"
                fontWeight="bold"
                textDecoration="underline"
                _hover={{ color: 'gray.400' }}
              >
                {data.discussion.title}
              </Text>
            </Text>
            <VStack align="start" spacing={3}>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Discussion Content:
              </Text>
              <Box
                maxH="150px"
                overflowY="auto"
                p={3}
                borderWidth="1px"
                borderRadius="md"
                bg="gray.700"
              >
                <Text
                  whiteSpace="pre-wrap"
                  fontSize={{ base: 'sm', md: 'md' }}
                  color="gray.300"
                  lineHeight="1.6"
                  letterSpacing="0.05em"
                >
                  {data.discussion.content}
                </Text>
              </Box>
            </VStack>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Reported user ID:
              </Text>{' '}
              {data.discussion.userId}
            </Text>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Discussion ID:
              </Text>{' '}
              {data.discussion.id}
            </Text>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Reason:
              </Text>{' '}
              {data.reason}
            </Text>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Created at:
              </Text>{' '}
              {format(new Date(data.createdAt), 'PPPpp')}
            </Text>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Reporter:
              </Text>{' '}
              {data.user.username}
            </Text>
          </VStack>

          {/* Actions Section */}
          <HStack justify="flex-end" spacing={4}>
            <Button
              colorScheme="blue"
              onClick={() => {
                console.log('Dismiss action triggered');
              }}
            >
              Dismiss
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                console.log('Remove Discussion action triggered');
              }}
            >
              Remove Discussion
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => {
                console.log('Remove Discussion and Ban User action triggered');
              }}
            >
              Remove Discussion + Ban User
            </Button>
          </HStack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default DetailedDiscussionTicket;
