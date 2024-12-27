import { Heading } from '@chakra-ui/react';
interface LayoutTitleProps {
  title: string;
  subtitle?: string;
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
  borderBottom?: boolean;
  padding?: number;
}

const LayoutTitle: React.FC<LayoutTitleProps> = ({
  title,
  fontSize = { base: 'xl', md: '3xl' },
  fontWeight = 'bold',
  textAlign = 'center',
  color = 'gray.100',
}) => {
  return (
    <Heading
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAlign={textAlign}
      color={color}
    >
      {title}
    </Heading>
  );
};

export default LayoutTitle;
