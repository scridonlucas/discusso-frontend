import React, { useState, ReactNode } from 'react';
import { SortingOptionsContext } from '../hooks/useSortingOptions';
interface SortingOptionsProviderProps {
  children: ReactNode;
}

export const SortingOptionsProvider: React.FC<SortingOptionsProviderProps> = ({
  children,
}) => {
  const [sortCriteria, setSortCriteria] = useState<string>('recent');
  const [orderByDate, setOrderByDate] = useState<string>('all');

  return (
    <SortingOptionsContext.Provider
      value={{ sortCriteria, setSortCriteria, orderByDate, setOrderByDate }}
    >
      {children}
    </SortingOptionsContext.Provider>
  );
};
