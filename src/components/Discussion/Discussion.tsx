import { Discussion as DiscussionType } from '../../types/discussionTypes';
import { Box } from '@chakra-ui/react';
const Discussion = ({ discussion }: { discussion: DiscussionType }) => {
  console.log(discussion);
  return <Box>{discussion.title}</Box>;
};

export default Discussion;
