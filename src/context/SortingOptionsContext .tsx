import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SortingOptionsContextType {
  sortCriteria: string;
  setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
  orderByDate: string;
  setOrderByDate: React.Dispatch<React.SetStateAction<string>>;
}

const SortingOptionsContext = createContext<
  SortingOptionsContextType | undefined
>(undefined);

interface SortingOptionsProviderProps {
  children: ReactNode;
}

export const SortingOptionsProvider: React.FC<SortingOptionsProviderProps> = ({
  children,
}) => {
  const [sortCriteria, setSortCriteria] = useState<string>('recent');
  const [orderByDate, setOrderByDate] = useState<string>('desc');

  return (
    <SortingOptionsContext.Provider
      value={{ sortCriteria, setSortCriteria, orderByDate, setOrderByDate }}
    >
      {children}
    </SortingOptionsContext.Provider>
  );
};

export const useSortingOptions = (): SortingOptionsContextType => {
  const context = useContext(SortingOptionsContext);
  if (!context) {
    throw new Error(
      'useSortingOptions must be used within a SortingOptionsProvider'
    );
  }
  return context;
};
