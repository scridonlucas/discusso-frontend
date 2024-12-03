import { Flex } from '@chakra-ui/react';
import { useSortingOptions } from '../../hooks/useSortingOptions';
import DropdownMenu from '../DropdownMenu.tsx/DropdownMenu';
import ViewToggle from './ViewToggle';
const SortingBar = () => {
  const {
    sortCriteria,
    setSortCriteria,
    timeFrame,
    setTimeFrame,
    feedType,
    setFeedType,
  } = useSortingOptions();

  const handleSortChange = (sortCriteria: string | string[]) => {
    if (typeof sortCriteria === 'string') {
      setSortCriteria(sortCriteria);
    }
  };

  const handleTimeFrameChange = (timeFrame: string | string[]) => {
    if (typeof timeFrame === 'string') {
      setTimeFrame(timeFrame);
    }
  };

  const handleFeedTypeChange = (feedType: string | string[]) => {
    if (typeof feedType === 'string') {
      setFeedType(feedType);
    }
  };

  const sortOptions = [
    { value: 'recent', label: 'Recent' },
    { value: 'most_liked', label: 'Hot' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const timeFrameOptions = [
    { value: 'all', label: 'Any Time' },
    { value: 'last_hour', label: 'Last Hour' },
    { value: 'last_day', label: 'Last Day' },
    { value: 'last_week', label: 'Last 7 Days' },
    { value: 'last_month', label: 'Last Month' },
  ];

  const feedOptions = [
    { value: 'explore', label: 'Explore' },
    { value: 'following', label: 'Following' },
  ];

  return (
    <Flex
      p={3}
      boxShadow="md"
      width="100%"
      bg="gray.900"
      borderBottomColor="gray.700"
      borderBottomWidth="1px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex>
        <DropdownMenu
          options={sortOptions}
          selectedValue={sortCriteria}
          onChange={handleSortChange}
          title="Sort by"
          defaultLabel="Sort by"
        />
        <DropdownMenu
          options={timeFrameOptions}
          selectedValue={timeFrame}
          onChange={handleTimeFrameChange}
          title="Order by"
          defaultLabel="Order by"
        />
      </Flex>
      <ViewToggle
        options={feedOptions}
        selectedValue={feedType}
        onChange={handleFeedTypeChange}
      />
    </Flex>
  );
};

export default SortingBar;
