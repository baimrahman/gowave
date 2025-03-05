'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/styles'
import { useState, useMemo, useEffect, useRef } from 'react';

// Create custom icon
const customIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='%231976d2' d='M16 2C10.477 2 6 6.477 6 12c0 5.291 4.756 10.294 9.699 12h.602C21.244 22.294 26 17.291 26 12c0-5.523-4.477-10-10-10zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -42]
});

type Location = {
  position: LatLngTuple;
  name: string;
}

const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster text-center",
    iconSize: L.point(33, 33, true)
  });
};

enum PaddlingService {
  "StandUpPaddle" = "Stand Up Paddle",
  "Kayak" = "Kayak",
}

type PaddlingLocation = {
  position: LatLngTuple;
  name: string;
  logo: string;
  priceStart: number;
  service: PaddlingService[];
  whatsapp: string;
  direction: string;
  images: string[];
  place: string;
}



const paddlingLocations: PaddlingLocation[] = [
  { position: [-6.115710, 106.858338], place: "Pantai Ancol", name: "Maliko Stand Up Paddle", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9haOEOe4MT-ym9kCo9r7vdb9OYHZznflCqw&s", priceStart: 350000, service: [PaddlingService.StandUpPaddle], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.115710,106.858338", images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"] },
  { position: [-6.392044, 106.752839], place: "Danau 7 Muara", name: "Ulawana SUP", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEDFf0p1MURKyVy8Etyxk5pem3LRXsodaWA&s", priceStart: 300000, service: [PaddlingService.StandUpPaddle], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.392044,106.752839", images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"] },
  { position: [-6.113101, 106.863555], place: "Gelanggang Olah Raga Air Bahtera", name: "Klub Dayung Bahtera", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KqQwMrQ9YDLQg2Y7bx7zgSSf_sjTQzVbWg&s", priceStart: 300000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.113101,106.863555", images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"] },
  { position: [-6.883939, 107.451596], place: "Waduk Saguling", name: "Cathy Water Sports", logo: "https://picsum.photos/200/300", priceStart: 300000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.883939,107.451596", images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"] },
  { position: [-7.951609, 110.424639], place: "Sungai Oya", name: "Ulawana SUP", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEDFf0p1MURKyVy8Etyxk5pem3LRXsodaWA&s", priceStart: 200000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-7.951609,110.424639", images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"] },
  { position: [-7.821256, 110.115110], place: "Waduk Sermo", name: "Ulawana SUP", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEDFf0p1MURKyVy8Etyxk5pem3LRXsodaWA&s", priceStart: 200000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-7.821256,110.115110", images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"] },
  { position: [-6.337011, 107.321109], place: "Danau Bintang Alam", name: "Veloce SUP", logo: "https://andum.sgp1.cdn.digitaloceanspaces.com/gowave/veloce-sup/veloce-logo.png", priceStart: 300000, service: [PaddlingService.StandUpPaddle], whatsapp: "https://wa.me/6285183064291", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.337011,107.321109", images: ["https://andum.sgp1.cdn.digitaloceanspaces.com/gowave/veloce-sup/photo_2025-03-05_23-39-12%20-%20Veloce%20Management.jpg", "https://andum.sgp1.cdn.digitaloceanspaces.com/gowave/veloce-sup/photo_2025-03-05_23-39-16%20-%20Veloce%20Management.jpg", "https://andum.sgp1.cdn.digitaloceanspaces.com/gowave/veloce-sup/photo_2025-03-05_23-39-20%20-%20Veloce%20Management.jpg"] },
]

// First, let's create a new component for the reset zoom button
const ResetZoomButton = () => {
  const map = useMap();
  
  const handleResetZoom = () => {
    map.setView([-2.291376, 118.033578], 5);
  };

  return (
    <button
      onClick={handleResetZoom}
      className="absolute bottom-6 right-4 z-[1000] bg-white rounded-lg shadow-lg px-2 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
    >
      <svg 
        className="w-5 h-5 text-gray-800" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
        />
      </svg>
    </button>
  );
};

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

  return (
    <div className="relative h-screen w-full">
      <div className="absolute bottom-18 right-4 z-[1000] flex flex-col items-end" ref={filterRef}>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-white rounded-lg shadow-lg px-2 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          {(priceRange[0] > 0 || priceRange[1] < 400000 || selectedServices.length > 0) && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {(priceRange[0] > 0 || priceRange[1] < 400000 ? 1 : 0) + (selectedServices.length > 0 ? 1 : 0)}
            </span>
          )}
        </button>
        
        {isFilterOpen && (
          <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg p-4 min-w-[300px] filter-panel">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Filters</h3>
              <button 
                onClick={() => {
                  setPriceRange([0, 400000]);
                  setSelectedServices([]);
                  setIsFilterOpen(false);
                }} 
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

              {/* Existing Price Range Filter */}
              <div className="filter-section">
                <label className="font-medium text-sm text-gray-700 block mb-2">Price Range</label>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Rp {formatPrice(priceRange[0])}</span>
                  <span>Rp {formatPrice(priceRange[1])}</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full">
                  <input
                    type="range"
                    min="0"
                    max="400000"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Math.min(Number(e.target.value), priceRange[1] - 50000);
                      setPriceRange([value, priceRange[1]]);
                    }}
                    className="price-slider absolute w-full h-2 opacity-0 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="400000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Math.max(Number(e.target.value), priceRange[0] + 50000);
                      setPriceRange([priceRange[0], value]);
                    }}
                    className="price-slider absolute w-full h-2 opacity-0 cursor-pointer"
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
        )}
      </div>

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
                <div className="popup-content">
                  <div className="flex items-center mb-4 gap-4">
                    <img src={location.logo} alt={location.name} className="logo" />
                    <div>
                      <h3 className="text-lg font-bold">{location.name}</h3>
                      <div className="text-sm text-gray-500">{location.place}</div>
                    </div>
                  </div>
                  <div className="services">
                    {location.service.map((service, i) => (
                      <span key={i} className="service-tag">{service}</span>
                    ))}
                  </div>
                  <p className="price">Start from Rp {location.priceStart.toLocaleString()}</p>
                  <div className="actions">
                    <a href={location.whatsapp} target="_blank" rel="noopener noreferrer" className="action-button whatsapp">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="inline-block mr-1">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Chat
                    </a>
                    <a href={location.direction} target="_blank" rel="noopener noreferrer" className="action-button direction">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="inline-block mr-1">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Direction
                    </a>
                  </div>
                  <div className="images">
                    {location.images.slice(0, 3).map((img, i) => (
                      <img key={i} src={img} alt={`${location.name} ${i + 1}`} className="location-image" />
                    ))}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <ResetZoomButton />
      </MapContainer>
    </div>
  );
}