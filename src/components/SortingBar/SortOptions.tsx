import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const SortOptions = () => {
  return (
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
  );
};

export default SortOptions;
