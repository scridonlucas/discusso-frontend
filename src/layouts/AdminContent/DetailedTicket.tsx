import { useParams, Navigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
const DetailedTicket = () => {
  const { id } = useParams();

  return <Flex align="center" justify="center"></Flex>;
};

export default DetailedTicket;
