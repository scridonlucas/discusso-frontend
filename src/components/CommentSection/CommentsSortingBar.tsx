import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import DropdownMenu from '../SortingBar/DropdownMenu';
import { useCommentsSortingOptions } from '../../hooks/useCommentsSortingOptions';
const CommentsSortingBar: React.FC = () => {
  const { sort, setSort } = useCommentsSortingOptions();

  const sortOptions = [
    { value: 'recent', label: 'Recent' },
    { value: 'most_liked', label: 'Most Liked' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const handleSortChange = (sortCriteria: string | string[]) => {
    if (typeof sortCriteria === 'string') {
      setSort(sortCriteria);
    }
  };

  return (
    <Flex justify="space-between" align="center" mb={4}>
      <Text fontSize="lg" fontWeight="bold" color="gray.300">
        Comments
      </Text>
      <DropdownMenu
        options={sortOptions}
        selectedValue={sort}
        onChange={handleSortChange}
        title="Sort"
        defaultLabel="Sort by"
      />
    </Flex>
  );
};

export default CommentsSortingBar;
