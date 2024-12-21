import { Box, Text } from '@chakra-ui/react';

interface CardProps {
  title: string;
  value: number | string;
  bgColor?: string;
  textColor?: string;
  hoverColor?: string;
}

const DashboardCard = ({
  title,
  value,
  bgColor = 'gray.800',
  textColor = 'white',
  hoverColor = 'blue.500',
}: CardProps) => {
  return (
    <Box
      w={['100%', '100%', '300px']}
      p="6"
      bg={bgColor}
      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
      color={textColor}
      _hover={{
        transform: 'scale(1.05)',
        transition: 'all 0.2s',
        bg: hoverColor,
      }}
    >
      <Text fontSize="lg" fontWeight="bold" mb="2">
        {title}
      </Text>
      <Text fontSize="3xl" fontWeight="extrabold">
        {value}
      </Text>
    </Box>
  );
};

export default DashboardCard;
