import { Box } from '@chakra-ui/react';

const LoadingPage = () => {
  return (
    <>
      <Box
        minH={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box fontSize="6xl">☕</Box>
      </Box>
    </>
  );
};

export default LoadingPage;
