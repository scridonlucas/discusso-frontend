import React, { createContext, useContext } from 'react';

interface SortingOptionsContextType {
  sortCriteria: string;
  setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
  orderByDate: string;
  setOrderByDate: React.Dispatch<React.SetStateAction<string>>;
}

export const SortingOptionsContext = createContext<
  SortingOptionsContextType | undefined
>(undefined);

export const useSortingOptions = (): SortingOptionsContextType => {
  const context = useContext(SortingOptionsContext);
  if (!context) {
    throw new Error(
      'useSortingOptions must be used within a SortingOptionsProvider'
    );
  }
  return context;
};
