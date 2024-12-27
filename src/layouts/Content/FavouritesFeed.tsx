import { Stack, Box, VStack, Icon } from '@chakra-ui/react';
import SortingBar from '../../components/SortingBar/SortingBar';
import { FiStar } from 'react-icons/fi';
import DiscussionSection from '../../components/DiscussionSection/DiscussionSection';
import { useState } from 'react';
const FavouritesFeed = () => {
  const [feedType, setFeedType] = useState<string>('explore');
  const [sortCriteria, setSortCriteria] = useState<string>('recent');
  const [timeFrame, setTimeFrame] = useState<string>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [triggeredSearch, setTriggeredSearch] = useState<string>('');

  const handleSortChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setSortCriteria(value);
    }
  };

  const handleTimeFrameChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setTimeFrame(value);
    }
  };

  const handleFeedTypeChange = (value: string | string[]) => {
    if (typeof value === 'string') {
      setFeedType(value);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setTriggeredSearch(searchInput);
  };

  return (
    <Box>
      <SortingBar
        sortCriteria={sortCriteria}
        onSortChange={handleSortChange}
        timeFrame={timeFrame}
        onTimeFrameChange={handleTimeFrameChange}
        feedType={feedType}
        onFeedTypeChange={handleFeedTypeChange}
        searchInput={searchInput}
        onSearchInputChange={handleSearchInputChange}
        onSearchClick={handleSearchClick}
      />
      <VStack py={6}>
        <Box
          w={16}
          h={16}
          bg="gray.700"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="transform 0.2s ease, box-shadow 0.2s ease"
          _hover={{
            transform: 'scale(1.2)',
            boxShadow: '0 0 15px #38bdf8',
            cursor: 'pointer',
          }}
        >
          <Icon as={FiStar} w={8} h={8} color="white" />
        </Box>{' '}
        <Stack
          spacing={8}
          mx={'auto'}
          width={'100%'}
          maxW={'5xl'}
          py={6}
          px={6}
        >
          <DiscussionSection
            queryKey={[
              'discussions',
              null,
              feedType,
              sortCriteria,
              timeFrame,
              true,
              triggeredSearch,
            ]}
          />
        </Stack>
      </VStack>
    </Box>
  );
};

export default FavouritesFeed;
