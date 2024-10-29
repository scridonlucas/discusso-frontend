import { Box } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import DiscussionForm from '../../components/Forms/DiscussionForm/DiscussionForm';

const Create = () => {
  return (
    <Box
      width="100%"
      mx="auto"
      mt={8}
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      p={4}
    >
      <Stack spacing={8} width="100%" maxW="2x1" mt={4}>
        <DiscussionForm />
      </Stack>
    </Box>
  );
};

export default Create;
