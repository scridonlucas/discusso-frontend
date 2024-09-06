import { Button, ButtonGroup } from '@chakra-ui/react';

const ViewToggle = () => {
  return (
    <ButtonGroup isAttached>
      <Button variant={'ghost'}>For You</Button>
      <Button variant={'ghost'}>Following</Button>
    </ButtonGroup>
  );
};

export default ViewToggle;
