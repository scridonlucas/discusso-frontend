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
  actionType: 'remove' | 'removeAndBan' | 'dismiss';
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
    remove: {
      title: `Remove ${targetType}`,
      body: `Are you sure you want to remove this ${targetType}?`,
    },
    removeAndBan: {
      title: `Remove ${targetType} and Ban User`,
      body: `Are you sure you want to remove this ${targetType} and ban the user?`,
    },
    dismiss: {
      title: `Dismiss Ticket`,
      body: `Are you sure you want to dismiss this ticket? No further action will be taken.`,
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{actionMessages[actionType]['title']}</ModalHeader>
        <ModalBody>
          <Text>{actionMessages[actionType]['body']}</Text>
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
