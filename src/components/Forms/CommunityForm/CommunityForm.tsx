import { Button, Stack, Input, Textarea } from '@chakra-ui/react';
import validationSchema from './validationSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { NewCommunityParams } from '../../../types/communityTypes';
import { useAddCommunity } from '../../../hooks/usePostCommunity';
const CommunityForm = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<NewCommunityParams>();

  const postCommunityMutation = useAddCommunity();
  const onSubmit: SubmitHandler<NewCommunityParams> = (data) => {
    postCommunityMutation.mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="communityName" isInvalid={!!errors.communityName}>
          <Input
            placeholder="Community Name"
            size="lg"
            {...register('communityName', validationSchema.communityName)}
          />
          <FormErrorMessage>
            {errors.communityName && errors.communityName.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="description" isInvalid={!!errors.description}>
          <Textarea
            placeholder="Description (optional)"
            size="lg"
            resize="vertical"
            {...register('description', validationSchema.description)}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          isLoading={postCommunityMutation.isLoading}
        >
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CommunityForm;
