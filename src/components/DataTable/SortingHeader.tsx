import { Flex, Text } from '@chakra-ui/react';
import { Column } from '@tanstack/react-table';

interface SortingHeaderProps<TData> {
  column: Column<TData, unknown>;
  label: string;
}

const SortingHeader = <TData,>({
  column,
  label,
}: SortingHeaderProps<TData>) => (
  <Flex
    align="center"
    gap={2}
    onClick={column.getToggleSortingHandler()}
    cursor="pointer"
  >
    <Text>{label}</Text>
    {column.getIsSorted() === 'asc' && '▲'}
    {column.getIsSorted() === 'desc' && '▼'}
    {column.getIsSorted() === false && '⇅'}
  </Flex>
);

export default SortingHeader;
