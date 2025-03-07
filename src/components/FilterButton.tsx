interface FilterButtonProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export const FilterButton = ({
  isFilterOpen,
  setIsFilterOpen,
  hasActiveFilters,
  activeFilterCount
}: FilterButtonProps) => {
  return (
    <button 
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      className="bg-white rounded-lg shadow-lg w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors relative"
    >
      <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" 
        />
      </svg>
      {hasActiveFilters && (
        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {activeFilterCount}
        </span>
      )}
    </button>
  );
}; 