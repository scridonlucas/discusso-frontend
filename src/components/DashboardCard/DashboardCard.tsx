import { FC } from 'react';

import DataCard from './DataCard';
import LoadingCard from './LoadingCard';
import ErrorCard from './ErrorCard';

interface DashboardCardProps {
  isLoading: boolean;
  isError: boolean;
  loadingTitle: string;
  errorTitle: string;
  title: string;
  value?: string | number;
  bgColor: string;
  hoverColor: string;
  textColor: string;
}
const DashboardCard: FC<DashboardCardProps> = ({
  isLoading,
  isError,
  loadingTitle,
  errorTitle,
  title,
  value,
  bgColor,
  hoverColor,
  textColor,
}) => {
  if (isLoading) {
    return <LoadingCard title={loadingTitle} />;
  }

  if (isError) {
    return <ErrorCard title={errorTitle} />;
  }

  return (
    <DataCard
      title={title}
      value={value}
      bgColor={bgColor}
      hoverColor={hoverColor}
      textColor={textColor}
    />
  );
};

export default DashboardCard;
