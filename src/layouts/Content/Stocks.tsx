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
import SortingHeader from '../../components/DataTable/SortingHeader';
import { Flex } from '@chakra-ui/react';
import ServerError from '../../components/MainPage/ServerError';
import ServerLoading from '../../components/MainPage/ServerLoading';
import logsService from '../../services/logsService';
import { ModerationLog } from '../../types/commonTypes';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<ModerationLog>();
const Stocks = () => {
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
          <SortingHeader column={column} label="Created At" />
        ),
        cell: (info) => format(info.getValue(), 'yyyy-MM-dd HH:mm:ss'),
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.admin.username, {
        id: 'adminUsername',
        header: ({ column }) => <SortingHeader column={column} label="Admin" />,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.user?.username ?? '-', {
        id: 'userUsername',
        header: ({ column }) => (
          <SortingHeader column={column} label="Reported User" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('action', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Action" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.targetId ?? '-', {
        id: 'targetId',
        header: ({ column }) => (
          <SortingHeader column={column} label="Target ID" />
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
    return <ServerLoading />;
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

export default Stocks;
