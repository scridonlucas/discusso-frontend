import { useParams, Navigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

interface DetailedTicketProps {
  type: 'discussion' | 'comment';
}

const DetailedTicket: React.FC<DetailedTicketProps> = ({ type }) => {
  const { id } = useParams();
  console.log(type);
  if (!id) {
    return <Navigate to="admin/flagged-discussions" />;
  }

  return <Flex align="center" justify="center"></Flex>;
};

export default DetailedTicket;
