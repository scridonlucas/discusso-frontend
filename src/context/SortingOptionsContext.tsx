import React, { useState, ReactNode } from 'react';
import { SortingOptionsContext } from '../hooks/useSortingOptions';
interface SortingOptionsProviderProps {
  children: ReactNode;
}

export const SortingOptionsProvider: React.FC<SortingOptionsProviderProps> = ({
  children,
}) => {
  const [sortCriteria, setSortCriteria] = useState<string>('recent');
  const [timeFrame, setTimeFrame] = useState<string>('all');
  const [feedType, setFeedType] = useState<string>('explore');

  return (
    <SortingOptionsContext.Provider
      value={{
        sortCriteria,
        setSortCriteria,
        timeFrame,
        setTimeFrame,
        feedType,
        setFeedType,
      }}
    >
      {children}
    </SortingOptionsContext.Provider>
  );
};
