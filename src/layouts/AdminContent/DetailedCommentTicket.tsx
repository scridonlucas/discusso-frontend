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
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ServerError from '../../components/MainPage/ServerError';
import { useQuery } from '@tanstack/react-query';
import commentReportsService from '../../services/commentReportsService';
import { format } from 'date-fns';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useCloseCommentTicket } from '../../hooks/useCloseCommentTicket';
import TicketConfirmationModal from '../../components/Modals/TicketConfirmationModal';

const DetailedCommentTicket = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(
    ['commentTicket', Number(id)!],
    commentReportsService.getCommentReportById,
    {
      enabled: !!id,
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [actionType, setActionType] = useState<
    'DISMISS' | 'REMOVE_RESOURCE' | 'REMOVE_AND_BAN' | null
  >(null);

  const closeCommentTicket = useCloseCommentTicket();

  if (!id) {
    return <Navigate to="/admin/flagged-comments" />;
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

  const handleOpenModal = (
    action: 'DISMISS' | 'REMOVE_RESOURCE' | 'REMOVE_AND_BAN'
  ) => {
    setActionType(action);
    onOpen();
  };

  const handleConfirmAction = () => {
    if (actionType) {
      closeCommentTicket.mutate(
        { reportId: data.id, action: actionType },
        { onSuccess: onClose }
      );
    }
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
                Comment ID:
              </Text>{' '}
              <Text
                as={Link}
                to={`/comments/${data.comment.discussionId}`}
                color="gray.200"
                fontWeight="bold"
                textDecoration="underline"
                _hover={{ color: 'gray.400' }}
              >
                {data.comment.discussionId}
              </Text>
            </Text>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Discussion ID:
              </Text>{' '}
              <Text
                as={Link}
                to={`/discussions/${data.comment.id}`}
                color="gray.200"
                fontWeight="bold"
                textDecoration="underline"
                _hover={{ color: 'gray.400' }}
              >
                {data.comment.id}
              </Text>
            </Text>
            <VStack align="start" spacing={3}>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Comment Content:
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
                  {data.comment.content}
                </Text>
              </Box>
            </VStack>
            <Text>
              <Text as="span" fontWeight="semibold" color="blue.200">
                Reported user ID:
              </Text>{' '}
              {data.comment.userId}
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
            <Tooltip
              label="Actions are disabled because this ticket is not pending."
              isDisabled={data.status === 'PENDING'}
            >
              <HStack spacing={4} opacity={data.status === 'PENDING' ? 1 : 0.6}>
                <Button
                  colorScheme="blue"
                  onClick={() => handleOpenModal('DISMISS')}
                  isDisabled={data.status !== 'PENDING'}
                >
                  Dismiss
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleOpenModal('REMOVE_RESOURCE')}
                  isDisabled={data.status !== 'PENDING'}
                >
                  Remove Comment
                </Button>
                <Button
                  colorScheme="orange"
                  onClick={() => handleOpenModal('REMOVE_AND_BAN')}
                  isDisabled={data.status !== 'PENDING'}
                >
                  Remove Comment + Ban User
                </Button>
              </HStack>
            </Tooltip>
          </HStack>
        </Box>
      </Stack>
      {actionType && (
        <TicketConfirmationModal
          actionType={actionType}
          targetType="comment"
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleConfirmAction}
          isLoading={closeCommentTicket.isLoading}
        />
      )}
    </Flex>
  );
};

export default DetailedCommentTicket;
