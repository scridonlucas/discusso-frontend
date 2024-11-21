import { Button, Flex, Textarea } from '@chakra-ui/react';
import validationSchema from './validationSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { usePostComment } from '../../../hooks/usePostComment';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
type NewComment = {
  comment: string;
};
const CommentForm = ({ discussionId }: { discussionId: number }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewComment>();

  const postCommentMutation = usePostComment();
  const onSubmit: SubmitHandler<NewComment> = (data) => {
    const parsedData = {
      content: {
        content: data.comment,
      },
      discussionId,
    };

    postCommentMutation.mutate(parsedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction={'column'} gap={4}>
        <Flex>
          <FormControl id="comment" isInvalid={!!errors.comment}>
            <Textarea
              placeholder="Add a comment"
              resize="vertical"
              variant="filled"
              size="md"
              height="10"
              {...register('comment', validationSchema.comment)}
            />
            <FormErrorMessage>
              {errors.comment && errors.comment.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex direction="column" gap={4} mb={4}>
          <Flex justify="flex-end">
            <Button type="submit" loadingText="Submitting" size="md">
              Post
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </form>
  );
};

export default CommentForm;
