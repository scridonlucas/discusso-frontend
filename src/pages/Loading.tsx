import { Box, Image } from '@chakra-ui/react';
import logo from '../assets/images/discusso-logo.png';
const LoadingPage = () => {
  return (
    <>
      <Box
        minH={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Image
          src={logo}
          alt="Discusso Logo"
          boxSize={{ base: '60px', md: '80px', lg: '100px' }}
          objectFit="contain"
          transition="transform 0.3s ease, filter 0.3s ease"
          _hover={{
            transform: 'scale(1.1)',
            filter: 'brightness(1.2)',
            cursor: 'pointer',
          }}
        />
      </Box>
    </>
  );
};

export default LoadingPage;
