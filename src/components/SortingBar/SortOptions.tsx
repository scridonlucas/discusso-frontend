import { Button, ButtonGroup } from '@chakra-ui/react';

const SortOptions = () => {
  return (
    <ButtonGroup isAttached>
      <Button variant="outline">Top</Button>
      <Button variant="outline">Latest</Button>
    </ButtonGroup>
  );
};

export default SortOptions;
