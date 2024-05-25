import { Input } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
const DiscussionForm = () => {
  return (
    <form>
      <Stack spacing={6}>
        <Input placeholder="Title" size="lg" />
        <Textarea
          placeholder="Your discussion content..."
          size="lg"
          resize="vertical"
          height={150}
        />
        <Stack direction={'row'} align={'center'} justifyContent={'end'}>
          <Button type="submit" loadingText="Submitting" size="lg">
            Post
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default DiscussionForm;
