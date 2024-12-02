import React, { useState, ReactNode } from 'react';
import { CommentsSortingOptionsContext } from '../hooks/useCommentsSortingOptions';

interface CommentsSortingOptionsProviderProps {
  children: ReactNode;
}

export const CommentsSortingOptionsProvider: React.FC<
  CommentsSortingOptionsProviderProps
> = ({ children }) => {
  const [sort, setSort] = useState<'recent' | 'oldest' | 'most_liked'>(
    'recent'
  );

  return (
    <CommentsSortingOptionsContext.Provider value={{ sort, setSort }}>
      {children}
    </CommentsSortingOptionsContext.Provider>
  );
};
