import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from '@chakra-ui/react';
interface ConfirmationModalProps {
  actionType: 'DISMISS' | 'REMOVE_RESOURCE' | 'REMOVE_AND_BAN';
  targetType: 'discussion' | 'comment';
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const TicketConfirmationModal = ({
  actionType,
  targetType,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ConfirmationModalProps) => {
  const actionMessages = {
    REMOVE_RESOURCE: {
      title: `Remove ${targetType}`,
      body: `Are you sure you want to remove this ${targetType}?`,
    },
    REMOVE_AND_BAN: {
      title: `Remove ${targetType} and Ban User`,
      body: `Are you sure you want to remove this ${targetType} and ban the user?`,
    },
    DISMISS: {
      title: `Dismiss Ticket`,
      body: `Are you sure you want to dismiss this ticket? No further action will be taken.`,
    },
  };

  const { title, body } = actionMessages[actionType];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <Text>{body}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            No
          </Button>
          <Button colorScheme="red" onClick={onConfirm} isLoading={isLoading}>
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TicketConfirmationModal;
