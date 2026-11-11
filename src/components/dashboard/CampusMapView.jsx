import React, { useState } from 'react';
import {
  MapPin,
  List,
  Compass,
  Building2,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import TietCampusMap from '../map/TietCampusMap';
import RoomCard from '../rooms/RoomCard';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Input from '../common/Input';
import { useBooking } from '../../context/BookingContext';

const CampusMapView = () => {
  const { locations, rooms, selectedMapLocation, setSelectedMapLocation, focusLocationOnMap } = useBooking();
  const [viewMode, setViewMode] = useState('split'); // 'split', 'map-only', 'list-only'
  const [selectedBuildingId, setSelectedBuildingId] = useState('nava-nalanda');
  const [capacityFilter, setCapacityFilter] = useState('all');
  const [facilityFilter, setFacilityFilter] = useState('all');

  const selectedBuilding = locations.find(l => l.id === selectedBuildingId) || locations[0];

  // Rooms in selected building
  let buildingRooms = rooms.filter(r => r.locationId === selectedBuildingId);

  // Apply filters
  if (capacityFilter !== 'all') {
    const minCap = parseInt(capacityFilter, 10);
    buildingRooms = buildingRooms.filter(r => r.capacity >= minCap);
  }

  if (facilityFilter !== 'all') {
    buildingRooms = buildingRooms.filter(r =>
      r.facilities.some(f => f.toLowerCase().includes(facilityFilter.toLowerCase()))
    );
  }

  const handleBuildingSelect = (building) => {
    setSelectedBuildingId(building.id);
    setSelectedMapLocation(building);
    focusLocationOnMap(building.id);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-space-card via-[#1A1D2C] to-space-sidebar border border-space-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-secondary uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Thapar Institute of Engineering & Technology (TIET), Patiala</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Interactive TIET Campus Map & Space Navigator
          </h2>
          <p className="text-xs text-space-muted mt-1 max-w-2xl leading-relaxed">
            Explore live geo-referenced university landmarks: Nava Nalanda Central Library, LHC / TAN Complex, COS Hub, STEP Venture Lab, and Kravings. Click any marker to reveal study rooms and real-time telemetry.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-space-sidebar border border-space-border/80 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'split'
                ? 'bg-primary text-white shadow-sm'
                : 'text-space-muted hover:text-white'
            }`}
          >
            Split View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('map-only')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'map-only'
                ? 'bg-primary text-white shadow-sm'
                : 'text-space-muted hover:text-white'
            }`}
          >
            Map Only
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list-only')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'list-only'
                ? 'bg-primary text-white shadow-sm'
                : 'text-space-muted hover:text-white'
            }`}
          >
            Landmarks List
          </button>
        </div>
      </div>

      {/* Main Grid: Map & Associated Rooms */}
      <div className={`grid gap-6 ${viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        {/* Leaflet Map Column */}
        {viewMode !== 'list-only' && (
          <div className={viewMode === 'split' ? 'lg:col-span-7' : 'w-full'}>
            <TietCampusMap
              height={viewMode === 'split' ? '560px' : '650px'}
              selectedBuildingId={selectedBuildingId}
              onSelectBuilding={handleBuildingSelect}
              showSearchAndFilters={true}
            />
          </div>
        )}

        {/* Building Details & Rooms Column */}
        {viewMode !== 'map-only' && (
          <div className={viewMode === 'split' ? 'lg:col-span-5 space-y-5' : 'w-full space-y-6'}>
            {/* Selected Landmark Info Card */}
            {selectedBuilding && (
              <Card className="p-5 border-primary/30 shadow-card-elevated">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-secondary px-2 py-0.5 rounded bg-space-sidebar border border-space-border">
                        {selectedBuilding.shortCode}
                      </span>
                      <span className="text-[11px] text-space-muted bg-space-sidebar px-2 py-0.5 rounded-full border border-space-border">
                        {selectedBuilding.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {selectedBuilding.name}
                    </h3>
                    <p className="text-xs text-space-dim flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{selectedBuilding.locationAccuracy}</span>
                    </p>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    {selectedBuilding.isBookable ? 'Bookable' : 'Public Landmark'}
                  </span>
                </div>

                <p className="text-xs text-space-muted leading-relaxed mt-3">
                  {selectedBuilding.description}
                </p>

                {/* Operating hours & popular for */}
                <div className="mt-3.5 p-3 rounded-xl bg-space-sidebar/90 border border-space-border/70 text-xs space-y-1.5 text-space-muted">
                  <div className="flex items-center justify-between">
                    <span className="text-space-dim flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Operating Hours:
                    </span>
                    <strong className="text-white font-medium">{selectedBuilding.openHours}</strong>
                  </div>
                  {selectedBuilding.popularFor && (
                    <div className="pt-1.5 border-t border-space-border/50 text-[11px]">
                      <span className="text-space-dim">Popular For: </span>
                      <span className="text-space-text font-medium">{selectedBuilding.popularFor}</span>
                    </div>
                  )}
                </div>

                {/* Filters for Rooms in this building */}
                {selectedBuilding.isBookable && (
                  <div className="mt-4 pt-3 border-t border-space-border/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-white">
                      Rooms in {selectedBuilding.shortCode} ({buildingRooms.length} Demo Records)
                    </span>

                    <div className="flex items-center gap-2">
                      <select
                        value={capacityFilter}
                        onChange={(e) => setCapacityFilter(e.target.value)}
                        className="bg-space-sidebar border border-space-border rounded-lg text-[11px] text-space-text px-2 py-1 focus:outline-none focus:border-primary"
                      >
                        <option value="all">Any Capacity</option>
                        <option value="4">4+ Seats</option>
                        <option value="8">8+ Seats</option>
                        <option value="12">12+ Seats</option>
                      </select>

                      <select
                        value={facilityFilter}
                        onChange={(e) => setFacilityFilter(e.target.value)}
                        className="bg-space-sidebar border border-space-border rounded-lg text-[11px] text-space-text px-2 py-1 focus:outline-none focus:border-primary"
                      >
                        <option value="all">All Facilities</option>
                        <option value="4k">4K Display</option>
                        <option value="whiteboard">Whiteboard</option>
                        <option value="soundproofing">Soundproof</option>
                        <option value="projector">Projector</option>
                      </select>
                    </div>
                  </div>
                )}
              </Card>
            )}

            {/* List of associated rooms */}
            {selectedBuilding?.isBookable ? (
              <div className="space-y-4">
                {buildingRooms.length === 0 ? (
                  <div className="p-8 text-center rounded-xl bg-space-card border border-dashed border-space-border text-xs text-space-muted">
                    No rooms in this building match the selected capacity or facility filter.
                  </div>
                ) : (
                  buildingRooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                  ))
                )}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-space-sidebar/60 border border-space-border text-xs text-space-muted space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>Campus Facility Notice</span>
                </div>
                <p className="leading-relaxed">
                  {selectedBuilding?.name} is a designated open university facility (dining, security, or common gathering hub). Individual study rooms and booking permissions do not apply here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Campus Landmarks Directory Grid below */}
      <div className="pt-6 border-t border-space-border/60 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary-light" />
            <h3 className="text-base font-bold text-white tracking-tight">
              TIET Campus Landmarks Directory
            </h3>
          </div>
          <span className="text-xs text-space-dim">
            Click any building to locate it on the map and explore available rooms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {locations.map((loc) => {
            const isSelected = selectedBuildingId === loc.id;
            return (
              <Card
                key={loc.id}
                hoverEffect
                onClick={() => handleBuildingSelect(loc)}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-primary ring-1 ring-primary bg-space-card-hover' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-secondary">
                    {loc.shortCode}
                  </span>
                  <Badge variant={loc.isBookable ? 'available' : 'neutral'} size="sm">
                    {loc.isBookable ? 'Bookable' : 'Facility'}
                  </Badge>
                </div>

                <h4 className="font-semibold text-sm text-white line-clamp-1">
                  {loc.name}
                </h4>

                <p className="text-[11px] text-space-dim flex items-center gap-1 mt-1 truncate">
                  <MapPin className="w-3 h-3 text-primary shrink-0" />
                  <span>{loc.categoryLabel}</span>
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CampusMapView;
