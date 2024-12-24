import { Skeleton, Box } from '@chakra-ui/react';
const LoadingCommunityPreview = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="gray.800" width="100%" opacity="0.85">
      <Skeleton
        startColor="gray.700"
        endColor="gray.600"
        height="20px"
        mb={4}
      />
      <Skeleton
        startColor="gray.700"
        endColor="gray.600"
        height="20px"
        mb={4}
      />
      <Skeleton startColor="gray.700" endColor="gray.600" height="20px" />
    </Box>
  );
};

export default LoadingCommunityPreview;
