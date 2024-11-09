import { useParams, Navigate } from 'react-router-dom';
import { Box, Flex, Stack } from '@chakra-ui/react';
const DetailedDiscussion = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/home" />;
  }

  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} width={'100%'} maxW={'5xl'} py={12} px={6}>
        <Box> test</Box>
      </Stack>
    </Flex>
  );
};

export default DetailedDiscussion;
