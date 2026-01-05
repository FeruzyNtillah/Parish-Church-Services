import { useMemo, useState } from 'react';
import type { Family } from '../types';

type SortField = 'name' | 'members' | 'date';
type SortOrder = 'asc' | 'desc';

export const useFamilyFilters = (families: Family[], getMemberCount: (familyId: string) => number) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const familiesPerPage = 12;

  const filteredAndSortedFamilies = useMemo(() => {
    let filtered = families.filter(family =>
      family.familyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort families
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.familyName.localeCompare(b.familyName);
          break;
        case 'members':
          comparison = getMemberCount(a.id) - getMemberCount(b.id);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [families, searchQuery, sortBy, sortOrder, getMemberCount]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedFamilies.length / familiesPerPage);
  const paginatedFamilies = filteredAndSortedFamilies.slice(
    (currentPage - 1) * familiesPerPage,
    currentPage * familiesPerPage
  );

  const toggleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const resetPagination = () => setCurrentPage(1);

  return {
    searchQuery,
    setSearchQuery: (query: string) => {
      setSearchQuery(query);
      resetPagination();
    },
    currentPage,
    setCurrentPage,
    sortBy,
    sortOrder,
    toggleSort,
    totalPages,
    paginatedFamilies,
    filteredAndSortedFamilies,
    familiesPerPage
  };
};
