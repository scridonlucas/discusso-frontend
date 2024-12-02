import React, { createContext, useContext } from 'react';

interface CommentsSortingOptionsContextType {
  sort: 'recent' | 'oldest' | 'most_liked';
  setSort: React.Dispatch<
    React.SetStateAction<'recent' | 'oldest' | 'most_liked'>
  >;
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
