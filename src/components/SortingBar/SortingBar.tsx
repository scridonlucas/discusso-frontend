import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useSortingOptions } from '../../hooks/useSortingOptions';
import DropdownMenu from './DropdownMenu';
const SortingBar = () => {
  const { sortCriteria, setSortCriteria, setOrderByDate } = useSortingOptions();

  const handleSortChange = (sortCriteria: string | string[]) => {
    if (typeof sortCriteria === 'string') {
      setSortCriteria(sortCriteria);
    }
  };

  /*const handleOrberByDateChange = (timeFrame: string | string[]) => {
    if (typeof timeFrame === 'string') {
      setOrderByDate(timeFrame);
    }
  };*/

  const sortOptions = [
    { value: 'recent', label: 'Recent' },
    { value: 'most_liked', label: 'Hot' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const timeFrameOptions = [
    { value: 'all', label: 'All' },
    { value: 'last_hour', label: 'Last Hour' },
    { value: 'last_day', label: 'Last Day' },
    { value: 'last_week', label: 'Last 7 Days' },
    { value: 'last_month', label: 'Last Month' },
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
      </Flex>
      ForYou
    </Flex>
  );
};

export default SortingBar;
