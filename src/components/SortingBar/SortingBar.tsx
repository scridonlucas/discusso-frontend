import { Flex } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const SortingBar = ({
  sortCriteria,
  setSortCriteria,
}: {
  sortCriteria: string;
  setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  return (
    <Flex
      p={3}
      boxShadow="md"
      width="100%"
      bg={'gray.900'}
      borderBottomColor={'gray.700'}
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
          variant={'ghost'}
        >
          Sort by
        </MenuButton>
        <MenuList>
          <MenuItem>Best</MenuItem>
          <MenuItem>Recent</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SortingBar;
