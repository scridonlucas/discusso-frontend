import { Button, ButtonGroup } from '@chakra-ui/react';

const ViewToggle = () => {
  return (
    <ButtonGroup isAttached>
      <Button variant="outline">For You</Button>
      <Button variant="outline">Following</Button>
    </ButtonGroup>
  );
};

export default ViewToggle;
