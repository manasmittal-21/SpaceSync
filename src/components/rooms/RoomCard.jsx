import React from 'react';
import { Users, Volume2, Sparkles, Heart, ArrowUpRight, Zap, MapPin, Compass } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';

const RoomCard = ({ room, onSelect, onLocateOnMap, compact = false }) => {
  const { toggleFavorite, setActiveModalRoom, addToRecentlyViewed, focusLocationOnMap } = useBooking();

  const handleCardClick = () => {
    addToRecentlyViewed(room);
    if (onSelect) {
      onSelect(room);
    }
  };

  const handleQuickBook = (e) => {
    e.stopPropagation();
    addToRecentlyViewed(room);
    setActiveModalRoom(room);
  };

  const handleToggleHeart = (e) => {
    e.stopPropagation();
    toggleFavorite(room.id);
  };

  const handleMapLocate = (e) => {
    e.stopPropagation();
    if (room.locationId) {
      focusLocationOnMap(room.locationId);
      if (onLocateOnMap) {
        onLocateOnMap(room);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge variant="available" dot pulse size="sm">Available Now</Badge>;
      case 'busy':
        return <Badge variant="busy" dot size="sm">In Use</Badge>;
      case 'reserved':
        return <Badge variant="reserved" dot size="sm">Reserved Soon</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Offline</Badge>;
    }
  };

  const buildingDisplay = room.buildingName || room.building || 'TIET Campus';
  const facilitiesList = room.facilities || room.amenities || [];

  return (
    <div
      onClick={handleCardClick}
      className={`
        group bg-space-card border border-space-border hover:border-space-border-light
        rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between
        hover:shadow-card-elevated hover:-translate-y-1 cursor-pointer relative
        ${compact ? 'p-3' : 'p-0'}
      `}
    >
      {/* Top Image & Overlay */}
      <div className="relative aspect-[16/10] overflow-hidden bg-space-sidebar">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-card via-transparent to-black/30" />

        {/* Status Badge & Favorite Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <div className="backdrop-blur-md bg-space-bg/60 rounded-full">
            {getStatusBadge(room.status || room.availability)}
          </div>
          <div className="flex items-center gap-1.5">
            {room.locationId && (
              <button
                type="button"
                onClick={handleMapLocate}
                className="p-2 rounded-full backdrop-blur-md bg-space-bg/60 text-secondary hover:text-white hover:bg-space-bg/90 border border-white/10 transition-all"
                title="Locate on TIET Campus Map"
              >
                <Compass className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={handleToggleHeart}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                room.isFavorite
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : 'bg-space-bg/60 text-white/70 hover:text-white hover:bg-space-bg/90 border border-white/10'
              }`}
              title={room.isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-4 h-4 ${room.isFavorite ? 'fill-rose-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Room Code & Category Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          <span className="font-mono bg-space-bg/90 border border-space-border px-2 py-0.5 rounded text-secondary font-medium backdrop-blur-sm">
            {room.code}
          </span>
          <span className="text-space-text/90 bg-space-bg/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-space-border/50 text-[11px]">
            {room.roomType || room.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Building & Location */}
          <div className="flex items-center gap-1.5 text-xs text-space-muted mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{buildingDisplay}</span>
            <span>•</span>
            <span className="shrink-0">{room.floor}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base text-space-text group-hover:text-primary-light transition-colors line-clamp-1">
            {room.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-space-dim line-clamp-2 mt-1 leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Room Metrics (Capacity, Noise, Temp) */}
        <div className="grid grid-cols-2 gap-2 py-2 border-y border-space-border/50 text-xs">
          <div className="flex items-center gap-1.5 text-space-muted">
            <Users className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>Capacity: <strong className="text-space-text font-medium">{room.capacity} seats</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-space-muted">
            <Volume2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{(room.noiseLevel || 'Silent').split(' ')[0]} zone</span>
          </div>
        </div>

        {/* Key Facilities/Amenities */}
        <div className="flex flex-wrap gap-1.5">
          {facilitiesList.slice(0, 3).map((amenity, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-space-sidebar text-space-muted border border-space-border/60 px-2 py-0.5 rounded-md truncate max-w-[150px]"
            >
              {amenity}
            </span>
          ))}
          {facilitiesList.length > 3 && (
            <span className="text-[11px] text-space-dim self-center pl-0.5">
              +{facilitiesList.length - 3} more
            </span>
          )}
        </div>

        {/* Action Row */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-space-border/40">
          <div className="flex items-baseline gap-1 text-xs">
            <span className="font-semibold text-sm text-space-text">{room.hourlyPoints}</span>
            <span className="text-space-dim">pts/hr</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={room.status === 'available' || room.availability === 'available' ? 'primary' : 'outline'}
              onClick={handleQuickBook}
              rightIcon={ArrowUpRight}
            >
              {room.status === 'available' || room.availability === 'available' ? 'Quick Book' : 'Reserve'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
