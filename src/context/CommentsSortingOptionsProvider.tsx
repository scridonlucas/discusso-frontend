import React, { useState, ReactNode } from 'react';
import { CommentsSortingOptionsContext } from '../hooks/useCommentsSortingOptions';

interface CommentsSortingOptionsProviderProps {
  children: ReactNode;
}

export const CommentsSortingOptionsProvider: React.FC<
  CommentsSortingOptionsProviderProps
> = ({ children }) => {
  const [sortCriteria, setSortCriteria] = useState<string>('recent');

  return (
    <CommentsSortingOptionsContext.Provider
      value={{ sortCriteria, setSortCriteria }}
    >
      {children}
    </CommentsSortingOptionsContext.Provider>
  );
};
