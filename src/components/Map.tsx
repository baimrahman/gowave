'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css'
import 'react-leaflet-markercluster/styles'

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

export default function Map() {
  return (
    <MapContainer
      center={[-2.291376, 118.033578]}
      zoom={5}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon} showCoverageOnHover={false}>
        {paddlingLocations.map((location, index) => (
          <Marker
            key={index}
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
    </MapContainer>
  );
}