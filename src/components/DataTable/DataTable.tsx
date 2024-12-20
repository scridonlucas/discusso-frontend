import { flexRender, Table as ReactTableInstance } from '@tanstack/react-table';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Flex,
} from '@chakra-ui/react';

interface DataTableProps<TData> {
  table: ReactTableInstance<TData>;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  showSearch?: boolean;
  showPagination?: boolean;
  width?: string;
  variant?: string;
  size?: string;
}
const DataTable = <TData,>({
  table,
  globalFilter = '',
  onGlobalFilterChange,
  showSearch = false,
  showPagination = false,
  width = '100%',
  variant = 'simple',
  size = 'md',
}: DataTableProps<TData>) => {
  return (
    <Flex direction="column" gap={4} width={width}>
      {showSearch && onGlobalFilterChange && (
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          width="30%"
        />
      )}

      <ChakraTable variant={variant} size={size}>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
      {showPagination && (
        <Flex justify="space-between" align="center">
          <Button
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanNextPage()}
          >
            First
          </Button>
          <Button
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <Button
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <Button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            isDisabled={!table.getCanNextPage()}
          >
            Last
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default DataTable;
