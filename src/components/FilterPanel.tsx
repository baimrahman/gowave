import { PaddlingService } from '../types';
import { useRef, useEffect } from 'react';

interface FilterPanelProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedServices: PaddlingService[];
  toggleService: (service: PaddlingService) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
  formatPrice: (price: number) => string;
  setSelectedServices: (services: PaddlingService[]) => void;
}

export const FilterPanel = ({
  priceRange,
  setPriceRange,
  selectedServices,
  toggleService,
  setIsFilterOpen,
  formatPrice,
  setSelectedServices
}: FilterPanelProps) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = sliderContainerRef.current;
    if (!container) return;
    
    const preventMapInteraction = (e: Event) => {
      e.stopPropagation();
    };
    
    // Touch events for mobile
    container.addEventListener('touchstart', preventMapInteraction, { passive: false });
    container.addEventListener('touchmove', preventMapInteraction, { passive: false });
    container.addEventListener('touchend', preventMapInteraction, { passive: false });
    
    // Mouse events for web
    container.addEventListener('mousedown', preventMapInteraction);
    container.addEventListener('mousemove', preventMapInteraction);
    container.addEventListener('mouseup', preventMapInteraction);
    container.addEventListener('wheel', preventMapInteraction, { passive: false });
    
    return () => {
      // Remove touch event listeners
      container.removeEventListener('touchstart', preventMapInteraction);
      container.removeEventListener('touchmove', preventMapInteraction);
      container.removeEventListener('touchend', preventMapInteraction);
      
      // Remove mouse event listeners
      container.removeEventListener('mousedown', preventMapInteraction);
      container.removeEventListener('mousemove', preventMapInteraction);
      container.removeEventListener('mouseup', preventMapInteraction);
      container.removeEventListener('wheel', preventMapInteraction);
    };
  }, []);
  
  const handleReset = () => {
    setPriceRange([0, 400000]);
    setSelectedServices([]);
    setIsFilterOpen(false);
  };

  return (
    <div 
      className="absolute bottom-full bg-white rounded-lg shadow-lg p-4 min-w-[300px] filter-panel"
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onMouseUp={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Filters</h3>
        <button 
          onClick={handleReset}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Service Type Filter */}
        <div className="filter-section">
          <label className="font-medium text-sm text-gray-700 block mb-2">Service Type</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedServices([])}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedServices.length === 0
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {Object.values(PaddlingService).map((service) => (
              <button
                key={service}
                onClick={() => toggleService(service)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedServices.includes(service)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-section">
          <label className="font-medium text-sm text-gray-700 block mb-2">Price Range</label>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Rp {formatPrice(priceRange[0])}</span>
            <span>Rp {formatPrice(priceRange[1])}</span>
          </div>
          <div ref={sliderContainerRef} className="relative h-2 bg-gray-200 rounded-full touch-none">
            <input
              type="range"
              min="0"
              max="400000"
              value={priceRange[0]}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), priceRange[1] - 50000);
                setPriceRange([value, priceRange[1]]);
              }}
              className="price-slider absolute w-full h-2 opacity-0 cursor-pointer touch-none"
            />
            <input
              type="range"
              min="0"
              max="400000"
              value={priceRange[1]}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), priceRange[0] + 50000);
                setPriceRange([priceRange[0], value]);
              }}
              className="price-slider absolute w-full h-2 opacity-0 cursor-pointer touch-none"
            />
            <div 
              className="absolute h-2 bg-blue-500 rounded-full" 
              style={{ 
                left: `${(priceRange[0] / 400000) * 100}%`,
                right: `${100 - (priceRange[1] / 400000) * 100}%`
              }}
            />
            <div 
              className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1.5 transform -translate-x-1/2"
              style={{ left: `${(priceRange[0] / 400000) * 100}%` }}
            />
            <div 
              className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -mt-1.5 transform -translate-x-1/2"
              style={{ left: `${(priceRange[1] / 400000) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 