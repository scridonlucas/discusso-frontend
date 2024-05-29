import { Input } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import validationSchema from './validationSchema';
import { NewDiscussion } from '../../../types/discussionTypes';
import { usePostDiscussion } from '../../../hooks/usePostDiscussion';

const DiscussionForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewDiscussion>();
  const postDiscussionMutation = usePostDiscussion();

  const onSubmit: SubmitHandler<NewDiscussion> = (data) => {
    console.log(data);
    postDiscussionMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <FormControl id="title" isInvalid={!!errors.title}>
          <Input
            placeholder="Title"
            size="lg"
            {...register('title', validationSchema.title)}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="content" isInvalid={!!errors.content}>
          <Textarea
            placeholder="Your discussion content..."
            size="lg"
            resize="vertical"
            height={150}
            {...register('content', validationSchema.content)}
          />
          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
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
