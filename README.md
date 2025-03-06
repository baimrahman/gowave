# GoWave - Paddling Locations Map

GoWave is an interactive map application that helps users discover paddling locations across Indonesia. The application displays SUP (Stand Up Paddle) and Kayak locations with detailed information, pricing, and contact options.

![GoWave Screenshot](https://andum.sgp1.cdn.digitaloceanspaces.com/gowave/Screenshot%202025-03-07%20at%2001.33.40%20(1).png)

## Features

- **Interactive Map**: Explore paddling locations across Indonesia with an easy-to-use map interface
- **Location Details**: View detailed information about each location including:
  - Name and logo
  - Location
  - Available services (SUP, Kayak)
  - Starting prices
  - Photo gallery
  - Contact options (WhatsApp, Directions)
- **Advanced Filtering**:
  - Filter by price range using an interactive slider
  - Filter by service type (SUP, Kayak, or both)
  - Reset filters with a single click
  - Filter counter shows active filters at a glance
- **Mobile Responsive**: Fully optimized for both desktop and mobile devices
- **Map Controls**: 
  - Reset view button to return to the default map view
  - Cluster markers for better visualization of multiple locations

## Technology Stack

- **Next.js**: React framework for server-rendered applications
- **React Leaflet**: React components for Leaflet maps
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Type-safe JavaScript for better development experience

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/gowave.git
   cd gowave
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
gowave/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout component
│   │   └── page.tsx          # Home page component
│   ├── components/
│   │   ├── FilterButton.tsx  # Filter toggle button component
│   │   ├── FilterPanel.tsx   # Filter panel with price and service filters
│   │   ├── LocationPopup.tsx # Popup component for location details
│   │   ├── Map.tsx           # Main map component
│   │   ├── MapMarker.tsx     # Custom map marker component
│   │   └── ResetZoomButton.tsx # Button to reset map view
│   ├── data/
│   │   └── paddlingLocations.ts # Location data
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── public/
│   └── ...                   # Static assets
└── ...                       # Config files
```

## Usage

### Exploring Locations

- **View Location Details**: Click on any marker to view detailed information about the paddling location
- **Contact Providers**: Use the WhatsApp button to chat with providers or the Directions button to navigate to the location

### Filtering Locations

- **Open Filter Panel**: Click the filter button in the bottom-right corner of the map
- **Filter by Price**: Adjust the price range slider to set minimum and maximum prices
- **Filter by Service**: Select "All" for all services, or choose specific services (SUP, Kayak)
- **Reset Filters**: Click the "Reset" button to clear all filters
- **Close Filter Panel**: Click outside the panel or click the filter button again

### Map Navigation

- **Pan**: Click and drag the map to move around
- **Zoom**: Use the scroll wheel or pinch gestures to zoom in and out
- **Reset View**: Click the home button to reset the map to the default view of Indonesia

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Leaflet](https://leafletjs.com/) - The open-source JavaScript library for interactive maps
- [React Leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Next.js](https://nextjs.org/) - The React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
