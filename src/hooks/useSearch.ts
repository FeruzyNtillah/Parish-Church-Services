import { useState, useMemo } from 'react';
import { searchInFields } from '../utils';

interface UseSearchProps<T extends Record<string, any>> {
  items: T[];
  searchFields: (keyof T)[];
  initialQuery?: string;
}

interface UseSearchReturn<T extends Record<string, any>> {
  query: string;
  filteredItems: T[];
  setQuery: (query: string) => void;
  clearSearch: () => void;
  isSearching: boolean;
}

export function useSearch<T extends Record<string, any>>({
  items,
  searchFields,
  initialQuery = '',
}: UseSearchProps<T>): UseSearchReturn<T> {
  const [query, setQuery] = useState(initialQuery);

  const filteredItems = useMemo(() => 
    searchInFields(items, query, searchFields),
    [items, query, searchFields]
  );

  const clearSearch = () => {
    setQuery('');
  };

  const isSearching = query.trim().length > 0;

  return {
    query,
    filteredItems,
    setQuery,
    clearSearch,
    isSearching,
  };
}
