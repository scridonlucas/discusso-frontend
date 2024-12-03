import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface Option {
  value: string;
  label: string;
}

interface DropdownMenuProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string | string[]) => void;
  title: string;
  defaultLabel?: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  selectedValue,
  onChange,
  title,
  defaultLabel,
}) => {
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <Menu>
      <MenuButton
        as={Button}
        size="sm"
        borderRadius="md"
        rightIcon={<ChevronDownIcon />}
        variant="ghost"
      >
        {selectedOption?.label || defaultLabel || title}
      </MenuButton>
      <MenuList w="fit-content" minW="100px" maxW="150px" p={0}>
        <MenuOptionGroup
          defaultValue={selectedValue}
          type="radio"
          onChange={onChange}
          title={title}
        >
          {options.map((option) => (
            <MenuItemOption key={option.value} value={option.value}>
              {option.label}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default DropdownMenu;
