import { PaddlingLocation } from '../types';
import { useMap } from 'react-leaflet';

interface LocationPopupProps {
  location: PaddlingLocation;
}

export const LocationPopup = ({ location }: LocationPopupProps) => {
  const map = useMap();
  
  const handleClose = () => {
    map.closePopup();
  };

  return (
    <div className="popup-content">
      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors z-10"
        aria-label="Close popup"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Header with logo and name */}
      <div className="flex items-start mb-5 gap-4 pr-10">
        <div className="relative flex-shrink-0">
          <img 
            src={location.logo} 
            alt={location.name} 
            className="w-16 h-16 rounded-xl object-cover shadow-sm border border-gray-100" 
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-gray-800 break-words">{location.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{location.place}</span>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Available Services</div>
        <div className="flex flex-wrap gap-2">
          {location.service.map((service, i) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4 flex items-center">
        <div className="bg-green-100 p-1.5 rounded-full mr-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <div>
          <div className="text-xs text-gray-500 leading-none">Starting from</div>
          <div className="text-base font-bold text-green-700">Rp {location.priceStart.toLocaleString()}</div>
        </div>
      </div>

      {/* Images */}
      {location.images.length > 0 && (
        <div className="mb-5">
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Gallery</div>
          <div className="grid grid-cols-3 gap-2">
          {location.images.slice(0, 3).map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg aspect-square group">
              <img 
                src={img} 
                alt={`${location.name} ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
              />
            </div>
          ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {location.whatsapp && (
          <a 
          href={location.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="white" className="mr-2">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
            <span className="text-white">Chat</span>
          </a>
        )}
        {location.direction && (
          <a 
          href={location.direction} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium flex items-center justify-center transition-all duration-200 shadow-sm hover:shadow"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="white" className="mr-2">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
            <span className="text-white">Directions</span>
          </a>
        )}
      </div>
    </div>
  );
}; 