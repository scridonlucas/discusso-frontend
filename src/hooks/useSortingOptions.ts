import React, { createContext, useContext } from 'react';

interface SortingOptionsContextType {
  sortCriteria: string;
  setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
  timeFrame: string;
  setTimeFrame: React.Dispatch<React.SetStateAction<string>>;
  feedType: string;
  setFeedType: React.Dispatch<React.SetStateAction<string>>;
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
