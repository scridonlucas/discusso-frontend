import { Heading } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import DiscussionForm from '../../components/Forms/DiscussionForm/DiscussionForm';

const Create = () => {
  return (
    <Box
      ml={{ base: 0, md: 50 }}
      width="100%"
      maxW={{ base: '90%', md: '800px' }}
      mx="auto"
      mt={8}
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      p={4}
    >
      <Stack spacing={8} width="100%" maxW="2xl" mt={4}>
        <Heading as="h2" size="lg" mb={6}>
          Start a discussion
        </Heading>
        <DiscussionForm />
      </Stack>
    </Box>
  );
};

export default Create;
