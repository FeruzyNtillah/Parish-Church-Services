import React from 'react';
import { Search, Grid, List } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onToggleSort: (field: 'name' | 'members' | 'date') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  showAlphabetical: boolean;
  onAlphabeticalToggle: () => void;
  totalFamilies: number;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  sortOrder,
  onToggleSort,
  viewMode,
  onViewModeChange,
  showAlphabetical,
  onAlphabeticalToggle,
  totalFamilies,
}) => {
  return (
    <div className="bg-card p-6 rounded-2xl shadow-xl border border-border mb-6">
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search families by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-input rounded-xl focus:ring-2 focus:ring-ring focus:border-ring bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {(['name', 'members', 'date'] as const).map((field) => (
            <button
              key={field}
              onClick={() => onToggleSort(field)}
              className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 ${
                sortBy === field 
                  ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                  : 'border-border hover:bg-accent text-foreground'
              }`}
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}{' '}
              {sortBy === field && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              viewMode === 'grid' 
                ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                : 'border-border hover:bg-accent text-foreground'
            }`}
          >
            <Grid className="w-4 h-4" />
            Grid
          </button>
          
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              viewMode === 'list' 
                ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                : 'border-border hover:bg-accent text-foreground'
            }`}
          >
            <List className="w-4 h-4" />
            List
          </button>
          
          <button
            onClick={onAlphabeticalToggle}
            className={`px-4 py-3 rounded-xl border transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
              showAlphabetical 
                ? 'bg-primary/10 border-primary text-primary shadow-lg' 
                : 'border-border hover:bg-accent text-foreground'
            }`}
          >
            A-Z
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground font-medium">
          {totalFamilies} families total
        </div>
      </div>

      {searchQuery && (
        <div className="mt-4 text-sm text-muted-foreground">
          Found {totalFamilies} families matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};
