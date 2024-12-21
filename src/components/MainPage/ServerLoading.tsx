import { Flex, Spinner, Text } from '@chakra-ui/react';

interface LoadingProps {
  text?: string;
}
const ServerLoading = ({ text }: LoadingProps = {}) => {
  return (
    <Flex
      align={'center'}
      flexDirection={'column'}
      gap={'3vh'}
      justify={'center'}
      alignItems={'center'}
      minH={'100vh'}
    >
      <Spinner size="xl" />
      <Text fontSize="xl" color="white">
        {text
          ? text
          : "Just a moment, we're fetching the latest data for you..."}
      </Text>
    </Flex>
  );
};

export default ServerLoading;
