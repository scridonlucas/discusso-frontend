import { Flex, Stack } from '@chakra-ui/react';
import SortingBar from '../../components/SortingBar/SortingBar';

import { useSortingOptions } from '../../hooks/useSortingOptions';
import DiscussionSection from '../../components/DiscussionSection/DiscussionSection';
const Timeline = () => {
  const { sortCriteria, timeFrame, feedType } = useSortingOptions();

  return (
    <>
      <SortingBar />
      <Flex align={'center'} justify={'center'}>
        <Stack
          spacing={8}
          mx={'auto'}
          width={'100%'}
          maxW={'5xl'}
          py={12}
          px={6}
        >
          <DiscussionSection
            queryKey={[
              'discussions',
              null,
              feedType,
              sortCriteria,
              timeFrame,
              false,
            ]}
          />
        </Stack>
      </Flex>
    </>
  );
};

export default Timeline;
