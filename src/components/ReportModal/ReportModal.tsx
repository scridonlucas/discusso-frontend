import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
interface ReportModalProps {
  reportTarget: 'discussion' | 'comment';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  isLoading: boolean;
}

const ReportModal = ({
  reportTarget,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ReportModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>('');

  const reportReasons: { value: string; label: string }[] = [
    { value: 'SPAM', label: 'Spam' },
    { value: 'ADVERTISING', label: 'Advertising' },
    { value: 'FRAUD', label: 'Fraud' },
    { value: 'FINANCIAL_MANIPULATION', label: 'Financial Manipulation' },
    { value: 'INAPPROPRIATE', label: 'Inappropriate' },
    { value: 'HARASSMENT', label: 'Harassment' },
    { value: 'MISINFORMATION', label: 'Misinformation' },
    { value: 'COPYRIGHT_VIOLATION', label: 'Copyright Violation' },
    { value: 'OFF_TOPIC', label: 'Off Topic' },
    { value: 'OTHER', label: 'Other' },
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      alert('Please select a reason for reporting.');
      return;
    }
    onSubmit(selectedReason);
    setSelectedReason('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pb={2}>Report {reportTarget}</ModalHeader>
        <ModalBody>
          <Text mb={4}>
            We want to make things better. What's the issue with this{' '}
            {reportTarget}?
          </Text>
          <RadioGroup onChange={setSelectedReason} value={selectedReason}>
            <Stack spacing={4}>
              {reportReasons.map(({ value, label }) => (
                <Radio key={value} value={value}>
                  {label}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={handleSubmit}
            isDisabled={!selectedReason || isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReportModal;
