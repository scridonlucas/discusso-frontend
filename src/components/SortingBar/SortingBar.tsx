import { Flex } from '@chakra-ui/react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import ViewToggle from './ViewToggle';

interface SortingBarProps {
  sortCriteria: string;
  onSortChange: (value: string | string[]) => void;
  timeFrame: string;
  onTimeFrameChange: (value: string | string[]) => void;
  feedType: string;
  onFeedTypeChange: (value: string | string[]) => void;
}

const SortingBar: React.FC<SortingBarProps> = ({
  sortCriteria,
  onSortChange,
  timeFrame,
  onTimeFrameChange,
  feedType,
  onFeedTypeChange,
}) => {
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
          onChange={onSortChange}
          title="Sort by"
          defaultLabel="Sort by"
        />
        <DropdownMenu
          options={timeFrameOptions}
          selectedValue={timeFrame}
          onChange={onTimeFrameChange}
          title="Order by"
          defaultLabel="Order by"
        />
      </Flex>
      <ViewToggle
        options={feedOptions}
        selectedValue={feedType}
        onChange={onFeedTypeChange}
      />
    </Flex>
  );
};

export default SortingBar;
