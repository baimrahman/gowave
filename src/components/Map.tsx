'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/styles'
import { useState, useMemo, useEffect, useRef } from 'react';
import { PaddlingService, PaddlingLocation } from '../types';
import { paddlingLocations } from '../data/paddlingLocations';
import { customIcon, createClusterCustomIcon } from './MapMarker';
import { LocationPopup } from './LocationPopup';
import { FilterPanel } from './FilterPanel';
import { FilterButton } from './FilterButton';
import { ResetZoomButton } from './ResetZoomButton';

export default function Map() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400000]);
  const [selectedServices, setSelectedServices] = useState<PaddlingService[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getFilteredLocations = (locations: PaddlingLocation[]) => {
    return locations.filter(location => {
      const matchesPrice = location.priceStart >= priceRange[0] && 
                         location.priceStart <= priceRange[1];
      
      const matchesService = selectedServices.length === 0 || 
                           selectedServices.some(service => 
                             location.service.includes(service)
                           );
      
      return matchesPrice && matchesService;
    });
  };

  const filteredLocations = useMemo(() => 
    getFilteredLocations(paddlingLocations), 
    [priceRange, selectedServices]
  );

  const formatPrice = (price: number) => {
    return `${(price/1000).toFixed(0)}K`;
  };

  const toggleService = (service: PaddlingService) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 400000 || selectedServices.length > 0;
  const activeFilterCount = (priceRange[0] > 0 || priceRange[1] < 400000 ? 1 : 0) + (selectedServices.length > 0 ? 1 : 0);

  return (
    <div className="relative h-screen w-full">
      <MapContainer
        center={[-2.291376, 118.033578]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <MarkerClusterGroup 
          key={`cluster-group-${priceRange[0]}-${priceRange[1]}-${selectedServices.join()}`}
          iconCreateFunction={createClusterCustomIcon} 
          showCoverageOnHover={false}
          chunkedLoading={true}
          removeOutsideVisibleBounds={true}
        >
          {filteredLocations.map((location, index) => (
            <Marker
              key={`marker-${location.name}-${index}`}
              position={location.position}
              icon={customIcon}
            >
              <Popup className="custom-popup">
                <LocationPopup location={location} />
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <div className="absolute bottom-2 right-0 z-[9999] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pr-[calc(1rem+env(safe-area-inset-right))] flex flex-col gap-2">
          <div ref={filterRef} className="flex flex-col items-end">
            <FilterButton
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              hasActiveFilters={hasActiveFilters}
              activeFilterCount={activeFilterCount}
            />
            
            {isFilterOpen && (
              <FilterPanel
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedServices={selectedServices}
                toggleService={toggleService}
                setIsFilterOpen={setIsFilterOpen}
                formatPrice={formatPrice}
                setSelectedServices={setSelectedServices}
              />
            )}
          </div>
          <ResetZoomButton />
        </div>
      </MapContainer>
    </div>
  );
}