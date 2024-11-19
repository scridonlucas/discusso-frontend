import { Button, Flex, Textarea } from '@chakra-ui/react';
import validationSchema from './validationSChema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePostComment } from '../../../hooks/usePostComment';
import commentDiscussionService from '../../../services/commentDiscussionService';

type NewComment = {
  content: string;
};
const CommentForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewComment>();

  const onSubmit: SubmitHandler<NewComment> = (data) => {};

  return (
    <form>
      <Flex direction="column" gap={4} mb={4}>
        <Textarea
          placeholder="Add a comment"
          resize="vertical"
          variant="filled"
          size="md"
          height="10"
        />

        <Flex justify="flex-end">
          <Button type="submit" loadingText="Submitting" size="md">
            Post
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default CommentForm;
