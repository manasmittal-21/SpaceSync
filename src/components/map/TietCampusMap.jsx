import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  Compass,
  Maximize2,
  Minimize2,
  BookOpen,
  GraduationCap,
  Users,
  Sparkles,
  Coffee,
  Shield,
  Layers,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { CAMPUS_LOCATIONS, TIET_CAMPUS_CENTER } from '../../data/campusLocations';
import { useBooking } from '../../context/BookingContext';

// Helper controller inside MapContainer to programmatically fly to locations
const MapController = ({ targetCoords, zoom, isFullscreen }) => {
  const map = useMap();

  useEffect(() => {
    if (targetCoords) {
      map.flyTo(targetCoords, zoom || 17, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [targetCoords, zoom, map]);

  useEffect(() => {
    // Invalidate map size whenever container resizes (e.g., fullscreen toggled)
    setTimeout(() => {
      map.invalidateSize();
    }, 250);
  }, [isFullscreen, map]);

  return null;
};

// SVG Icon string generator for custom Leaflet DivIcons
const createCategoryDivIcon = (category, isSelected) => {
  let color = '#7865F5'; // default primary
  let bgColor = '#1B1E2A';
  let svgPath = '';

  switch (category) {
    case 'library':
      color = '#7865F5';
      // Book icon
      svgPath = '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/>';
      break;
    case 'academic':
      color = '#3B82F6';
      // Cap icon
      svgPath = '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>';
      break;
    case 'student_hub':
      color = '#22C7D9';
      // Users icon
      svgPath = '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>';
      break;
    case 'innovation':
      color = '#F59E0B';
      // Sparkles/Rocket
      svgPath = '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>';
      break;
    case 'facility':
      color = '#10B981';
      // Coffee icon
      svgPath = '<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/>';
      break;
    default:
      color = '#94A3B8';
      // Shield
      svgPath = '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>';
      break;
  }

  const pulseHtml = isSelected
    ? `<div class="tiet-marker-pulse" style="background-color: ${color};"></div>`
    : '';

  const scaleStyle = isSelected
    ? `transform: scale(1.2); box-shadow: 0 0 18px ${color};`
    : '';

  const html = `
    <div class="tiet-marker-wrap">
      ${pulseHtml}
      <div class="tiet-marker-core" style="background-color: ${bgColor}; border-color: ${color}; ${scaleStyle}">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${svgPath}
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-tiet-marker-container',
    html: html,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22]
  });
};

const TietCampusMap = ({
  height = '540px',
  onSelectBuilding,
  selectedBuildingId,
  showSearchAndFilters = true,
  className = ''
}) => {
  const { locations, rooms, focusedLocationId, setFocusedLocationId } = useBooking();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapTarget, setMapTarget] = useState(null);
  const containerRef = useRef(null);
  const markerRefs = useRef({});

  // Sync with focusedLocationId from props or context
  useEffect(() => {
    const locId = selectedBuildingId || focusedLocationId;
    if (locId) {
      const targetLoc = locations.find(l => l.id === locId);
      if (targetLoc) {
        setMapTarget({ coords: targetLoc.coordinates, zoom: 17.5 });
        // Open marker popup after slight fly delay
        setTimeout(() => {
          if (markerRefs.current[locId]) {
            markerRefs.current[locId].openPopup();
          }
        }, 600);
      }
    }
  }, [selectedBuildingId, focusedLocationId, locations]);

  const handleResetCampusView = () => {
    setMapTarget({ coords: [TIET_CAMPUS_CENTER.lat, TIET_CAMPUS_CENTER.lng], zoom: 16 });
    setFocusedLocationId(null);
  };

  const handleMarkerClick = (loc) => {
    setFocusedLocationId(loc.id);
    if (onSelectBuilding) {
      onSelectBuilding(loc);
    }
  };

  const handleExploreRoomsClick = (loc) => {
    if (onSelectBuilding) {
      onSelectBuilding(loc);
    }
  };

  // Filter locations
  const filteredLocations = locations.filter(loc => {
    const matchesCategory = activeCategory === 'all' || loc.category === activeCategory;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Campus Hubs' },
    { id: 'library', label: 'Nava Nalanda Central Library' },
    { id: 'academic', label: 'LHC & Academic' },
    { id: 'student_hub', label: 'COS Complex' },
    { id: 'innovation', label: 'STEP Venture Lab' },
    { id: 'facility', label: 'Food & Facilities' }
  ];

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-space-border bg-space-sidebar shadow-card-elevated flex flex-col ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      } ${className}`}
      style={{ height: isFullscreen ? '100vh' : height }}
    >
      {/* Top Map Control Bar */}
      {showSearchAndFilters && (
        <div className="p-3 sm:p-4 bg-[#141724]/95 border-b border-space-border/80 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-3 z-10">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-space-dim">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search TIET landmarks (e.g. Nava Nalanda, TAN, COS, STEP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1D2B] border border-space-border text-xs text-white rounded-lg pl-9 pr-3 py-2 placeholder:text-space-dim focus:outline-none focus:border-primary"
            />
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            {/* Category filter pills on larger screens */}
            <div className="hidden xl:flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`text-[11px] px-2.5 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                    activeCategory === c.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-space-card text-space-muted hover:text-white border border-space-border/70'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Locate Campus Button */}
            <button
              type="button"
              onClick={handleResetCampusView}
              className="text-xs bg-space-card hover:bg-space-card-hover border border-space-border text-space-text px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              title="Reset view to central TIET campus"
            >
              <Compass className="w-4 h-4 text-secondary" />
              <span>Center Campus</span>
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-space-card hover:bg-space-card-hover border border-space-border text-space-text rounded-lg transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen Map'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-primary-light" />}
            </button>
          </div>
        </div>
      )}

      {/* Main Leaflet Map View */}
      <div className="flex-1 w-full h-full relative">
        <MapContainer
          center={[TIET_CAMPUS_CENTER.lat, TIET_CAMPUS_CENTER.lng]}
          zoom={TIET_CAMPUS_CENTER.defaultZoom}
          minZoom={TIET_CAMPUS_CENTER.minZoom}
          maxZoom={TIET_CAMPUS_CENTER.maxZoom}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          {/* CartoDB Dark Matter free map tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={19}
          />

          <MapController
            targetCoords={mapTarget?.coords}
            zoom={mapTarget?.zoom}
            isFullscreen={isFullscreen}
          />

          {/* Render TIET Landmark Markers */}
          {filteredLocations.map((loc) => {
            const isSelected = (selectedBuildingId || focusedLocationId) === loc.id;
            const markerIcon = createCategoryDivIcon(loc.category, isSelected);

            // Count rooms available in this location from demo dataset
            const locationRooms = rooms.filter(r => r.locationId === loc.id);
            const availableCount = locationRooms.filter(r => r.status === 'available').length;

            return (
              <Marker
                key={loc.id}
                position={loc.coordinates}
                icon={markerIcon}
                ref={(ref) => {
                  if (ref) markerRefs.current[loc.id] = ref;
                }}
                eventHandlers={{
                  click: () => handleMarkerClick(loc)
                }}
              >
                <Popup className="tiet-custom-popup" maxWidth={320} minWidth={280}>
                  <div className="p-4 space-y-3">
                    {/* Header Image */}
                    <div className="relative h-28 -mx-4 -mt-4 mb-3 rounded-t-xl overflow-hidden bg-space-sidebar">
                      <img
                        src={loc.image}
                        alt={loc.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1E2A] via-transparent to-black/30" />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold bg-space-bg/90 border border-white/20 text-secondary px-2 py-0.5 rounded">
                          {loc.shortCode}
                        </span>
                        <span className="text-[10px] font-medium bg-space-bg/80 text-white px-2 py-0.5 rounded-full border border-white/10">
                          {loc.categoryLabel}
                        </span>
                      </div>
                    </div>

                    {/* Building Name */}
                    <div>
                      <h3 className="font-bold text-sm text-white leading-tight">
                        {loc.name}
                      </h3>
                      <p className="text-[11px] text-space-muted flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-primary shrink-0" />
                        <span>{loc.locationAccuracy}</span>
                      </p>
                    </div>

                    {/* Description snippet */}
                    <p className="text-[11px] text-space-dim leading-relaxed line-clamp-2">
                      {loc.description}
                    </p>

                    {/* Hours & Availability */}
                    <div className="p-2.5 rounded-lg bg-space-sidebar border border-space-border text-[11px] space-y-1 text-space-muted">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-space-dim">
                          <Clock className="w-3 h-3" /> Hours:
                        </span>
                        <span className="text-white font-medium truncate max-w-[150px]">
                          {loc.openHours}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-space-border/50">
                        <span>Space Status:</span>
                        {loc.isBookable ? (
                          <span className="text-emerald-400 font-medium">
                            {locationRooms.length} Demo Rooms ({availableCount} Open)
                          </span>
                        ) : (
                          <span className="text-space-dim italic">
                            Public Landmark (Non-bookable)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {loc.isBookable && (
                      <Button
                        size="sm"
                        variant="primary"
                        className="w-full text-xs py-1.5"
                        onClick={() => handleExploreRoomsClick(loc)}
                        rightIcon={ArrowRight}
                      >
                        Explore {locationRooms.length} Rooms Here
                      </Button>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Floating Campus Coordinates Badge */}
        <div className="absolute bottom-3 left-3 z-[1000] pointer-events-none">
          <div className="px-3 py-1.5 rounded-lg bg-[#10121A]/90 border border-space-border text-[11px] font-mono text-space-muted backdrop-blur-md flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>TIET Patiala Campus • 30.35447°N, 76.36621°E</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TietCampusMap;
