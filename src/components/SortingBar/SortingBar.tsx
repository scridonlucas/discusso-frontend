import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const SortingBar = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
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
      bg={'gray.900'}
      borderBottomColor={'gray.700'}
      borderBottomWidth="1px"
      alignItems="center"
      justifyContent="space-between" // Distribute space evenly between SortOptions and ViewToggle
    >
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          borderRadius="md"
          rightIcon={<ChevronDownIcon />}
          variant={'ghost'}
        >
          {sortOptions.find((option) => option.value === sortCriteria)?.label ||
            'Sort by'}
        </MenuButton>
        <MenuList w="fit-content" minW="100px" maxW="150px" p={0}>
          <MenuOptionGroup title="Sort by">
            {sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SortingBar;
