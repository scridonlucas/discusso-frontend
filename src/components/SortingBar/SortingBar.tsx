import { Flex } from '@chakra-ui/react';
import SortOptions from './SortOptions';

const SortingBar = () => {
  return (
    <Flex
      p={3}
      boxShadow="md"
      width="100%"
      bg={'gray.900'}
      borderBottomColor={'gray.700'}
      borderBottomWidth="1px"
      alignItems="center"
      justifyContent="space-between" // Distribute space evenly between SortOptions and ViewToggle
    >
      <SortOptions />
    </Flex>
  );
};

export default SortingBar;
