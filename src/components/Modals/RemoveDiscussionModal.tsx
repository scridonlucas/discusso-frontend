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
interface RemoveDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const RemoveDiscussionModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: RemoveDiscussionModalProps) => {
  const actionMessages = 'Are you sure you want to delete this discussion?';

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Discussion</ModalHeader>
        <ModalBody>
          <Text>{actionMessages}</Text>
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

export default RemoveDiscussionModal;
