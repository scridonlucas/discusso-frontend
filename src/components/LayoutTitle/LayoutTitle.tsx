import { Text } from '@chakra-ui/react';
interface LayoutTitleProps {
  title: string;
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
  bgGradient?: string;
  bgClip?: string;
}

const LayoutTitle: React.FC<LayoutTitleProps> = ({
  title,
  fontSize = { base: '2xl', md: '3xl' },
  mb = 6,
  fontWeight = 'bold',
  textAlign = 'center',
  bgGradient = 'linear(to-r, teal.300, blue.400)',
  bgClip = 'text',
}) => {
  return (
    <Text
      fontSize={fontSize}
      mb={mb}
      fontWeight={fontWeight}
      textAlign={textAlign}
      bgGradient={bgGradient}
      bgClip={bgClip}
    >
      {title}
    </Text>
  );
};

export default LayoutTitle;
