import React from 'react';
import { MapPin, ExternalLink, Compass, Layers } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import TietCampusMap from '../map/TietCampusMap';
import { useBooking } from '../../context/BookingContext';

const MiniMapPreview = ({ onOpenFullMap }) => {
  const { locations, focusLocationOnMap } = useBooking();

  const handleBuildingClick = (loc) => {
    focusLocationOnMap(loc.id);
    if (onOpenFullMap) {
      onOpenFullMap();
    }
  };

  return (
    <Card className="p-5 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary uppercase tracking-wider mb-0.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Campus Geometry Preview</span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            TIET Patiala Interactive Campus Map
          </h3>
          <p className="text-xs text-space-dim">
            Centred at 30.35447°N, 76.36621°E • 8 Key University Landmarks
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={onOpenFullMap}
          rightIcon={ExternalLink}
          className="self-start sm:self-auto text-xs"
        >
          Open Fullscreen Navigator
        </Button>
      </div>

      {/* Mini Leaflet Map */}
      <div className="rounded-xl overflow-hidden border border-space-border/80 relative">
        <TietCampusMap
          height="280px"
          showSearchAndFilters={false}
          onSelectBuilding={handleBuildingClick}
        />
      </div>

      {/* Quick Landmark Jump Pills */}
      <div className="mt-3.5 pt-3 border-t border-space-border/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-space-dim text-[11px] shrink-0">Quick Jump:</span>
        {locations.slice(0, 5).map((loc) => (
          <button
            key={loc.id}
            type="button"
            onClick={() => handleBuildingClick(loc)}
            className="px-2.5 py-1 rounded-md bg-space-sidebar hover:bg-space-card border border-space-border/70 text-space-muted hover:text-white transition-colors shrink-0 text-[11px] font-medium flex items-center gap-1"
          >
            <MapPin className="w-3 h-3 text-primary-light" />
            <span>{loc.shortCode}</span>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default MiniMapPreview;
