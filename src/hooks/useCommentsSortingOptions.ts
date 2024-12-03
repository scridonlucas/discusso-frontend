import React, { createContext, useContext } from 'react';

interface CommentsSortingOptionsContextType {
  sortCriteria: string;
  setSortCriteria: React.Dispatch<React.SetStateAction<string>>;
}

export const CommentsSortingOptionsContext = createContext<
  CommentsSortingOptionsContextType | undefined
>(undefined);

export const useCommentsSortingOptions =
  (): CommentsSortingOptionsContextType => {
    const context = useContext(CommentsSortingOptionsContext);
    if (!context) {
      throw new Error(
        'useCommentsSortingOptions must be used within a CommentsSortingOptionsProvider'
      );
    }
    return context;
  };
