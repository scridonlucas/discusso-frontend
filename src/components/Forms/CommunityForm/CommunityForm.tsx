import { Button, HStack, Input, Stack } from '@chakra-ui/react';
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
    <Stack maxW={'sm'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing={4}>
          <FormControl id="communityName" isInvalid={!!errors.communityName}>
            <Input
              placeholder="Community Name"
              size="md"
              {...register('communityName', validationSchema.communityName)}
            />
            <FormErrorMessage>
              {errors.communityName && errors.communityName.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="md"
            isLoading={postCommunityMutation.isLoading}
            w={'80%'}
          >
            Create community
          </Button>
        </HStack>
      </form>
    </Stack>
  );
};

export default CommunityForm;
