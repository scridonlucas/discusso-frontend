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
import { useSortingOptions } from '../../context/SortingOptionsContext ';

const SortingBar = () => {
  const { sortCriteria, setSortCriteria } = useSortingOptions();

  const handleSortChange = (sortCriteria: string | string[]) => {
    if (typeof sortCriteria === 'string') {
      setSortCriteria(sortCriteria);
    }
  };

  const sortOptions = [
    { value: 'recent', label: 'Recent' },
    { value: 'most_liked', label: 'Hot' },
    { value: 'controversial', label: 'Controversial' },
    { value: 'oldest', label: 'Oldest' },
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
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          borderRadius="md"
          rightIcon={<ChevronDownIcon />}
          variant="ghost"
        >
          {' '}
          {sortOptions.find((option) => option.value === sortCriteria)?.label ||
            'Sort by'}
        </MenuButton>
        <MenuList w="fit-content" minW="100px" maxW="150px" p={0}>
          <MenuOptionGroup
            defaultValue={sortCriteria}
            type="radio"
            onChange={handleSortChange}
            title="Sort by"
          >
            {sortOptions.map((option) => (
              <MenuItemOption key={option.value} value={option.value}>
                {option.label}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SortingBar;
