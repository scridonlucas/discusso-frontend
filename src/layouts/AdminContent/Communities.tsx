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
import communityService from '../../services/communityService';
import ServerError from '../../components/MainPage/ServerError';
import DataTable from '../../components/DataTable/DataTable';
import SortingHeader from '../../components/DataTable/SortingHeader';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { Community } from '../../types/communityTypes';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Community>();

const Communities = () => {
  const { data, isLoading, isError } = useQuery(
    ['communities'],
    communityService.gatherCommunities
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: ({ column }) => <SortingHeader column={column} label="ID" />,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('name', {
        header: ({ column }) => <SortingHeader column={column} label="Name" />,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('createdAt', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Created At" />
        ),
        cell: (info) => format(info.getValue(), 'yyyy-MM-dd HH:mm:ss'),

        enableSorting: true,
      }),
    ],
    []
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
    return (
      <Flex
        align={'center'}
        flexDirection={'column'}
        gap={'3vh'}
        justify={'center'}
        alignItems={'center'}
        minH={'100vh'}
      >
        <Spinner size="xl" />
        <Text fontSize="xl" color="white">
          Just a moment! We're gathering the community list for you..
        </Text>
      </Flex>
    );
  }

  if (isError) {
    <ServerError />;
  }
  return (
    <Flex align="center" justify="center" p={4} w="full">
      <DataTable
        table={table}
        showSearch={true}
        showPagination={true}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        width="80%"
      />
    </Flex>
  );
};

export default Communities;
