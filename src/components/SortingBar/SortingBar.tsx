import { Flex } from '@chakra-ui/react';

const SortingBar = () => {
  return (
    <Flex
      p={2}
      boxShadow="md"
      width="100%"
      bg={'gray.900'}
      borderBottomColor={'gray.700'}
      borderBottomWidth="1px"
    ></Flex>
  );
};

export default SortingBar;
