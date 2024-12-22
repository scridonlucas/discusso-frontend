import React from 'react';
import { Flex } from '@chakra-ui/react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useCommentsSortingOptions } from '../../hooks/useCommentsSortingOptions';
const CommentsSortingBar: React.FC = () => {
  const { sortCriteria, setSortCriteria } = useCommentsSortingOptions();

  const sortOptions = [
    { value: 'recent', label: 'Recent' },
    { value: 'most_liked', label: 'Most Liked' },
    { value: 'oldest', label: 'Oldest' },
  ];

  const handleSortChange = (sortCriteria: string | string[]) => {
    if (typeof sortCriteria === 'string') {
      setSortCriteria(sortCriteria);
    }
  };

  return (
    <Flex align="center" mb={2} px={4}>
      <DropdownMenu
        options={sortOptions}
        selectedValue={sortCriteria}
        onChange={handleSortChange}
        title="Sort"
        defaultLabel="Sort by"
      />
    </Flex>
  );
};

export default CommentsSortingBar;
