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
import DataTable from '../../components/DataTable/DataTable';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import ServerError from '../../components/MainPage/ServerError';
import logsService from '../../services/logsService';
import { ModerationLog } from '../../types/commonTypes';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<ModerationLog>();
const ModerationLogs = () => {
  const { data, isLoading, isError } = useQuery(
    ['moderation-logs'],
    logsService.gatherModerationLogs
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('createdAt', {
        header: ({ column }) => (
          <Flex
            align="center"
            gap={2}
            onClick={column.getToggleSortingHandler()}
            cursor="pointer"
          >
            <Text>Created At</Text>

            {column.getIsSorted() === 'asc' && '▲'}
            {column.getIsSorted() === 'desc' && '▼'}
            {column.getIsSorted() === false && '⇅'}
          </Flex>
        ),
        cell: (info) => format(info.getValue(), 'yyyy-MM-dd HH:mm:ss'),
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.admin.username, {
        id: 'adminUsername',
        header: ({ column }) => (
          <Flex
            align="center"
            gap={2}
            onClick={column.getToggleSortingHandler()}
            cursor="pointer"
          >
            <Text>Admin</Text>

            {column.getIsSorted() === 'asc' && '▲'}
            {column.getIsSorted() === 'desc' && '▼'}
            {column.getIsSorted() === false && '⇅'}
          </Flex>
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.user?.username ?? '-', {
        id: 'userUsername',
        header: ({ column }) => (
          <Flex
            align="center"
            gap={2}
            onClick={column.getToggleSortingHandler()}
            cursor="pointer"
          >
            <Text>Reported User</Text>

            {column.getIsSorted() === 'asc' && '▲'}
            {column.getIsSorted() === 'desc' && '▼'}
            {column.getIsSorted() === false && '⇅'}
          </Flex>
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('action', {
        header: ({ column }) => (
          <Flex
            align="center"
            gap={2}
            onClick={column.getToggleSortingHandler()}
            cursor="pointer"
          >
            <Text>Action</Text>

            {column.getIsSorted() === 'asc' && '▲'}
            {column.getIsSorted() === 'desc' && '▼'}
            {column.getIsSorted() === false && '⇅'}
          </Flex>
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.targetId ?? '-', {
        id: 'targetId',
        header: ({ column }) => (
          <Flex
            align="center"
            gap={2}
            onClick={column.getToggleSortingHandler()}
            cursor="pointer"
          >
            <Text>Target ID</Text>

            {column.getIsSorted() === 'asc' && '▲'}
            {column.getIsSorted() === 'desc' && '▼'}
            {column.getIsSorted() === false && '⇅'}
          </Flex>
        ),
        cell: (info) => info.getValue(),
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
      const value = row.getValue(columnId);
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
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
          Just a moment! We're gathering all the moderation logs for you...
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

export default ModerationLogs;
