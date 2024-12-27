import { Flex, Stack } from '@chakra-ui/react';
import SortingBar from '../../components/SortingBar/SortingBar';
import DiscussionSection from '../../components/DiscussionSection/DiscussionSection';
import { useState } from 'react';
const Timeline = () => {
  const [sortCriteria, setSortCriteria] = useState<string>('recent');
  const [timeFrame, setTimeFrame] = useState<string>('all');
  const [feedType, setFeedType] = useState<string>('explore');
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
    <>
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
              triggeredSearch,
            ]}
          />
        </Stack>
      </Flex>
    </>
  );
};

export default Timeline;
