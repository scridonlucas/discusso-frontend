import { BoxProps, FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: React.ReactNode;
  path: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}
