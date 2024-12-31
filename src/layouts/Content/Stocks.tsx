import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
} from '@tanstack/react-table';
import { useRemoveStockFromFavorites } from '../../hooks/useStock';
import DataTable from '../../components/DataTable/DataTable';
import SortingHeader from '../../components/DataTable/SortingHeader';
import { Flex, Button } from '@chakra-ui/react';
import ServerError from '../../components/MainPage/ServerError';
import ServerLoading from '../../components/MainPage/ServerLoading';
import stockService from '../../services/stockService';
import { DetailedStock } from '../../types/stockTypes';
import StockForm from '../../components/Forms/StockForm/StockForm';
const columnHelper = createColumnHelper<DetailedStock>();
const Stocks = () => {
  const { data, isLoading, isError } = useQuery(
    ['stocks'],
    stockService.getFavoriteStocks
  );

  const removeStock = useRemoveStockFromFavorites();

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingHeader column={column} label="Name" />,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),

      columnHelper.accessor('ticker', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Symbol" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),

      columnHelper.accessor('price', {
        header: ({ column }) => <SortingHeader column={column} label="Price" />,
        cell: (info) =>
          info.getValue() !== null ? `$${info.getValue()}` : 'N/A',
        enableSorting: true,
      }),
      columnHelper.accessor('currency', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Currency" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('type', {
        header: ({ column }) => <SortingHeader column={column} label="Type" />,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('change', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Change (%)" />
        ),
        cell: (info) => (info.getValue() !== null ? info.getValue() : 'N/A'),
        enableSorting: true,
      }),
      columnHelper.accessor('changePercent', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Change Percent" />
        ),
        cell: (info) =>
          info.getValue() !== null ? `${info.getValue()}%` : 'N/A',
        enableSorting: true,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          const stockId = info.row.original.id;

          const handleRemove = () => {
            removeStock.mutate(stockId);
          };

          return (
            <Button size="sm" colorScheme="red" onClick={handleRemove}>
              Remove
            </Button>
          );
        },
      }),
    ],
    [removeStock]
  );
  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) => {
      const value = String(row.getValue(columnId) ?? '');
      return value.toLowerCase().includes(filterValue.toLowerCase());
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  if (isLoading) {
    return <ServerLoading />;
  }

  if (isError) {
    <ServerError />;
  }

  return (
    <Flex direction="column" gap={6}>
      <Flex align="center" width="80%" mx="auto" mt={6}>
        <StockForm />
      </Flex>
      <Flex justify={'center'}>
        <DataTable
          table={table}
          showSearch={true}
          showPagination={true}
          globalFilter={globalFilter}
          onGlobalFilterChange={setGlobalFilter}
          width="80%"
        />
      </Flex>
    </Flex>
  );
};

export default Stocks;
