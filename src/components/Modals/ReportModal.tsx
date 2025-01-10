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
  Textarea,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';

interface ReportModalProps {
  reportTarget: 'discussion' | 'comment';
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, notes?: string) => void;
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
  const [notes, setNotes] = useState<string>('');

  const reportReasons: { value: string; label: string }[] = [
    { value: 'FINANCIAL_MANIPULATION', label: 'Financial Manipulation' },
    { value: 'FRAUD', label: 'Fraud' },
    { value: 'ADVERTISING', label: 'Advertising' },
    { value: 'HARASSMENT', label: 'Harassment' },
    { value: 'INAPPROPRIATE_CONTENT', label: 'Inappropriate Content' },
    { value: 'MISINFORMATION', label: 'Misinformation' },
    { value: 'OFF_TOPIC', label: 'Off Topic' },
    { value: 'SPAM', label: 'Spam' },
    { value: 'OTHER', label: 'Other' },
  ];

  const changeNotesText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = () => {
    if (!selectedReason) {
      alert('Please select a reason for reporting.');
      return;
    }
    onSubmit(selectedReason, notes);
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
          <Flex direction="column" gap={4}>
            <RadioGroup onChange={setSelectedReason} value={selectedReason}>
              <Stack spacing={2}>
                {reportReasons.map(({ value, label }) => (
                  <Radio key={value} value={value}>
                    {label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Textarea
              placeholder="Enter additional notes regarding this report (optional)"
              value={notes}
              onChange={changeNotesText}
            />
          </Flex>
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
