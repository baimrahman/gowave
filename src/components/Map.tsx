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
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='%23FF0000' d='M16 2C10.477 2 6 6.477 6 12c0 5.291 4.756 10.294 9.699 12h.602C21.244 22.294 26 17.291 26 12c0-5.523-4.477-10-10-10zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
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

const locations: Location[] = [
  { position: [-7.797068, 110.370529], name: "Yogyakarta City Center" },
  { position: [-7.782815, 110.367024], name: "Malioboro" },
  { position: [-7.788942, 110.363736], name: "Tugu Station" },
  { position: [-7.805547, 110.364416], name: "Kraton Palace" },
  // { position: [-7.782962, 110.401684], name: "Prambanan Temple" }
];

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
}



const paddlingLocations: PaddlingLocation[] = [
  { position: [-6.115710, 106.858338], name: "Maliko Stand Up Paddle", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9haOEOe4MT-ym9kCo9r7vdb9OYHZznflCqw&s", priceStart: 350000, service: [PaddlingService.StandUpPaddle], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.115710,106.858338", images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"] },
  { position: [-6.392044, 106.752839], name: "Ulawana SUP", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEDFf0p1MURKyVy8Etyxk5pem3LRXsodaWA&s", priceStart: 300000, service: [PaddlingService.StandUpPaddle], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.392044,106.752839", images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"] },
  { position: [-6.113101, 106.863555], name: "Klub Dayung Bahtera", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5KqQwMrQ9YDLQg2Y7bx7zgSSf_sjTQzVbWg&s", priceStart: 300000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.113101,106.863555", images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"] },
  { position: [-6.883939, 107.451596], name: "Cathy Water Sports", logo: "https://picsum.photos/200/300", priceStart: 300000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-6.883939,107.451596", images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"] },
  { position: [-7.951609, 110.424639], name: "Ulawana SUP", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEDFf0p1MURKyVy8Etyxk5pem3LRXsodaWA&s", priceStart: 200000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-7.951609,110.424639", images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"] },
  { position: [-7.821256, 110.115110], name: "Ulawana SUP", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrEDFf0p1MURKyVy8Etyxk5pem3LRXsodaWA&s", priceStart: 200000, service: [PaddlingService.StandUpPaddle, PaddlingService.Kayak], whatsapp: "https://wa.me/6281234567890", direction: "https://www.google.com/maps/dir/?api=1&destination=-7.821256,110.115110", images: ["https://picsum.photos/200/300","https://picsum.photos/200/300","https://picsum.photos/200/300"] },
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
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon} showCoverageOnHover={false} >
        {paddlingLocations.map((location, index) => (
          <Marker
            key={index}
            position={location.position}
            icon={customIcon}
          >
            <Popup className="custom-popup">
              <div className="popup-content">
                <img src={location.logo} alt={location.name} className="logo" />
                <h3 className="title">{location.name}</h3>
                <div className="services">
                  {location.service.map((service, i) => (
                    <span key={i} className="service-tag">{service}</span>
                  ))}
                </div>
                <p className="price">Start from Rp {location.priceStart.toLocaleString()}</p>
                <div className="actions">
                  <a href={location.whatsapp} target="_blank" rel="noopener noreferrer" className="action-button whatsapp">
                    WhatsApp
                  </a>
                  <a href={location.direction} target="_blank" rel="noopener noreferrer" className="action-button direction">
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