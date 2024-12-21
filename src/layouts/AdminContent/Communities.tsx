import { useMemo, useState } from 'react';
import CommunityForm from '../../components/Forms/CommunityForm/CommunityForm';
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
import { useUpdateCommunity } from '../../hooks/useUpdateCommunity';
import communityService from '../../services/communityService';
import ServerError from '../../components/MainPage/ServerError';
import ServerLoading from '../../components/MainPage/ServerLoading';
import DataTable from '../../components/DataTable/DataTable';
import SortingHeader from '../../components/DataTable/SortingHeader';
import { Flex, Button } from '@chakra-ui/react';
import { Community } from '../../types/communityTypes';
import { format } from 'date-fns';

const columnHelper = createColumnHelper<Community>();

const Communities = () => {
  const { data, isLoading, isError } = useQuery(
    ['communities'],
    communityService.gatherCommunities
  );
  const updateCommunity = useUpdateCommunity();

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
      columnHelper.accessor('_count.discussions', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Discussions" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),

      columnHelper.accessor('_count.followers', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Followers" />
        ),
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
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          const communityId = info.row.original.id;

          const handleRemove = () => {
            updateCommunity.mutate({
              communityId: communityId,
              communityData: { isDeleted: true },
            });
          };

          return (
            <Button size="sm" colorScheme="red" onClick={handleRemove}>
              Remove
            </Button>
          );
        },
      }),
    ],
    [updateCommunity]
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
        <CommunityForm />
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

export default Communities;
