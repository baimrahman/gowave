import { useMap } from 'react-leaflet';

export const ResetZoomButton = () => {
  const map = useMap();
  
  const handleResetZoom = () => {
    map.setView([-2.291376, 118.033578], 5);
  };

  return (
    <button
      onClick={handleResetZoom}
      className="bg-white rounded-lg shadow-lg px-2 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors"
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