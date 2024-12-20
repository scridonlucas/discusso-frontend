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
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { Community } from '../../types/communityTypes';

const columnHelper = createColumnHelper<Community>();

const Communities = () => {
  const { data, isLoading, isError } = useQuery(
    ['communities'],
    communityService.gatherCommunities
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

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
    <>
      <h1>Communities</h1>
    </>
  );
};

export default Communities;
