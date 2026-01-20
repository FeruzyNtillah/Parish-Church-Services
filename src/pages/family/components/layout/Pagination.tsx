import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalCount,
  itemsPerPage,
  onPageChange,
}) => {
  const handleJumpToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
            currentPage === page
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'border border-border hover:bg-accent text-foreground'
          }`}
        >
          {page}
        </button>
      ));
    }

    return (
      <>
        <button
          onClick={() => onPageChange(1)}
          className={`px-3 py-2 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
            currentPage === 1
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'border border-border hover:bg-accent text-foreground'
          }`}
        >
          1
        </button>
        
        {currentPage > 3 && (
          <span className="px-2 text-muted-foreground">...</span>
        )}
        
        {currentPage > 2 && currentPage < totalPages - 1 && (
          <button
            onClick={() => onPageChange(currentPage)}
            className="px-3 py-2 text-sm font-bold bg-primary text-primary-foreground shadow-lg rounded-xl"
          >
            {currentPage}
          </button>
        )}
        
        {currentPage < totalPages - 2 && (
          <span className="px-2 text-muted-foreground">...</span>
        )}
        
        <button
          onClick={() => onPageChange(totalPages)}
          className={`px-3 py-2 text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
            currentPage === totalPages
              ? 'bg-primary text-primary-foreground shadow-lg'
              : 'border border-border hover:bg-accent text-foreground'
          }`}
        >
          {totalPages}
        </button>
      </>
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
        {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} families
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:bg-transparent"
          aria-label="Previous page"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-1">
          {renderPageNumbers()}
        </div>
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 disabled:hover:bg-transparent"
          aria-label="Next page"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      {totalPages > 7 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => handleJumpToPage(parseInt(e.target.value) || 1)}
            aria-label="Go to page"
            placeholder="Page"
            className="w-16 px-2 py-2 text-sm border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground text-center transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};
