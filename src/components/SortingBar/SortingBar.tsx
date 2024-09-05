import { HStack } from '@chakra-ui/react';
import ViewToggle from './ViewToggle';
import SortOptions from './SortOptions';

const SortingBar = () => {
  return (
    <HStack spacing={4} mb={4} justify="space-between">
      <ViewToggle />
      <SortOptions />
    </HStack>
  );
};

export default SortingBar;
