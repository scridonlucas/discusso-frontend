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
import userService from '../../services/userService';
import { Flex, Button, Select } from '@chakra-ui/react';
import { User } from '../../types/userTypes';
import ServerError from '../../components/MainPage/ServerError';
import ServerLoading from '../../components/MainPage/ServerLoading';
import { useUpdateUserStatus } from '../../hooks/useUpdateUserStatus';
import { useUpdateUserRole } from '../../hooks/useUpdateUserRole';

const columnHelper = createColumnHelper<User>();
const roles = ['ADMIN', 'USER'];
const UserManagement = () => {
  const { data, isLoading, isError } = useQuery(
    ['users'],
    userService.gatherUsers
  );
  const updateUserStatus = useUpdateUserStatus();
  const updateUserRole = useUpdateUserRole();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: ({ column }) => <SortingHeader column={column} label="ID" />,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),

      columnHelper.accessor('username', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Username" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor('status', {
        header: ({ column }) => (
          <SortingHeader column={column} label="Status" />
        ),
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.accessor((row) => row.role.roleName, {
        id: 'roleName',
        header: ({ column }) => <SortingHeader column={column} label="Role" />,
        cell: (info) => info.getValue(),
        enableSorting: true,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          const user = info.row.original;
          const isBanned = user.status === 'BANNED';
          const nextStatus = isBanned ? 'ACTIVE' : 'BANNED';

          const handleClick = () => {
            updateUserStatus.mutate({
              userId: user.id,
              userStatus: nextStatus,
            });
          };

          return (
            <Button
              colorScheme={isBanned ? 'green' : 'red'}
              size="sm"
              onClick={handleClick}
              isLoading={
                updateUserStatus.isLoading &&
                updateUserStatus.variables?.userId === user.id
              }
            >
              {isBanned ? 'Unban' : 'Ban'}
            </Button>
          );
        },
      }),
      columnHelper.display({
        id: 'role',
        header: 'Role',
        cell: ({ row: { original: user } }) => {
          const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const selectedRoleName = e.target.value;
            updateUserRole.mutate({
              userId: user.id,
              roleName: selectedRoleName,
            });
          };

          return (
            <Select
              size="sm"
              _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
              value={user.role.roleName}
              onChange={handleChange}
              isDisabled={
                updateUserRole.isLoading &&
                updateUserRole.variables?.userId === user.id
              }
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          );
        },
      }),
    ],
    [updateUserStatus, updateUserRole]
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

export default UserManagement;
