import {
  Input,
  Heading,
  Textarea,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Select,
} from '@chakra-ui/react';
import { FiAlertTriangle } from 'react-icons/fi';
import { useForm, SubmitHandler } from 'react-hook-form';
import validationSchema from './validationSchema';
import { NewDiscussion } from '../../../types/discussionTypes';
import { usePostDiscussion } from '../../../hooks/usePostDiscussion';
import { useQuery } from '@tanstack/react-query';
import communityService from '../../../services/communityService';
import { Text, Spinner, Flex } from '@chakra-ui/react';
const DiscussionForm = () => {
  const {
    data: communities,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['communities'],
    queryFn: communityService.gatherCommunities,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<NewDiscussion>();

  const postDiscussionMutation = usePostDiscussion();

  const onSubmit: SubmitHandler<NewDiscussion> = (data) => {
    const parsedData = {
      ...data,
      communityId: Number(data.communityId),
    };
    postDiscussionMutation.mutate(parsedData);
  };

  if (isLoading) {
    return (
      <Flex
        align={'center'}
        flexDirection={'column'}
        gap={'3vh'}
        justify={'center'}
        alignItems={'center'}
        minH={'50vh'}
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="white">
          Just a moment! We're gathering the communities...
        </Text>
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex
        align="center"
        justify="center"
        minH={'50vh'}
        direction="column"
        p={6}
      >
        <Icon as={FiAlertTriangle} w={12} h={12} color="red.500" mb={4} />
        <Text fontSize="2xl" color="red.500" fontWeight="bold" mb={2}>
          Oops! Something went wrong.
        </Text>
        <Text
          fontSize="md"
          color="gray.600"
          mb={6}
          textAlign="center"
          maxW="sm"
        >
          We encountered an unexpected error while trying to gather data from
          our servers. Please try refreshing the page, or contact support if the
          problem persists.
        </Text>
        <Button onClick={() => window.location.reload()} size="lg">
          Refresh Page
        </Button>
      </Flex>
    );
  }

  return (
    <Stack maxW={{ base: '90%', md: '800px' }} ml={{ base: 0, md: 50 }}>
      <Heading as="h2" size="lg" mb={6}>
        Start a discussion
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={6}>
          <FormControl id="communityId" isInvalid={!!errors.communityId}>
            <Select
              placeholder="Select a community"
              {...register('communityId', {
                required: 'Community is required',
              })}
            >
              {communities.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.communityId && errors.communityId.message}
            </FormErrorMessage>
          </FormControl>
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
    </Stack>
  );
};

export default DiscussionForm;
