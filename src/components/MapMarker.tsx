import L from 'leaflet';

export const customIcon = L.icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='%231976d2' d='M16 2C10.477 2 6 6.477 6 12c0 5.291 4.756 10.294 9.699 12h.602C21.244 22.294 26 17.291 26 12c0-5.523-4.477-10-10-10zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/svg%3E",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -42]
});

export const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster text-center",
    iconSize: L.point(33, 33, true)
  });
}; 