import { Box, Text } from '@chakra-ui/react';

interface LayoutTitleProps {
  title: string;
  subtitle?: string; // Optional subtitle for extra context
  fontSize?: { base: string; md: string } | string;
  mb?: number;
  fontWeight?: string;
  textAlign?:
    | 'center'
    | 'end'
    | 'justify'
    | 'left'
    | 'match-parent'
    | 'right'
    | 'start'
    | undefined;
  color?: string;
  borderBottom?: boolean; // Option for bottom border
  padding?: number; // Optional padding
}

const LayoutTitle: React.FC<LayoutTitleProps> = ({
  title,
  subtitle,
  fontSize = { base: '2xl', md: '4xl' }, // Slightly larger for social media
  mb = 6,
  fontWeight = 'bold',
  textAlign = 'left', // Social media layouts often align left
  color = 'gray.800', // Dark gray for a modern touch
  borderBottom = true, // Adds a subtle divider
  padding = 2,
}) => {
  return (
    <Box
      mb={mb}
      pb={padding}
      borderBottom={borderBottom ? '1px solid #E2E8F0' : 'none'}
    >
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAlign={textAlign}
        color={color}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          fontWeight="medium"
          textAlign={textAlign}
          color="gray.500" // Softer gray for the subtitle
          mt={1}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
};

export default LayoutTitle;
