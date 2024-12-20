import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
    ['users'],
    logsService.gatherModerationLogs
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('createdAt', {
        header: 'Created at',
        cell: (info) => format(info.getValue(), 'yyyy-MM-dd HH:mm:ss'),
      }),
      columnHelper.accessor((row) => row.admin.username, {
        id: 'adminUsername',
        header: 'Admin',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.user?.username ?? '-', {
        id: 'userUsername',
        header: 'User',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.targetId ?? '-', {
        id: 'targetId',
        header: 'Target ID',
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
          Just a moment! We're gathering all the latest discussions for you...
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
