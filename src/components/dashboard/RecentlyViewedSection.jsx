import React from 'react';
import { History, ArrowUpRight, MapPin, Users, Volume2 } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { useBooking } from '../../context/BookingContext';

const RecentlyViewedSection = () => {
  const { recentlyViewed, setActiveModalRoom } = useBooking();

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
          <History className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-lg font-bold text-white tracking-tight">
          Recently Viewed Spaces
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recentlyViewed.slice(0, 3).map((room) => (
          <Card
            key={room.id}
            hoverEffect
            className="p-4 flex items-center gap-3.5"
            onClick={() => setActiveModalRoom(room)}
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-16 h-16 rounded-xl object-cover border border-space-border shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[11px] font-semibold text-secondary">
                  {room.code}
                </span>
                <Badge
                  variant={room.status === 'available' ? 'available' : 'busy'}
                  dot
                  size="sm"
                >
                  {room.status === 'available' ? 'Available' : 'Busy'}
                </Badge>
              </div>

              <h4 className="font-semibold text-xs text-white truncate">
                {room.name}
              </h4>

              <p className="text-[11px] text-space-dim flex items-center gap-1 mt-0.5 truncate">
                <MapPin className="w-3 h-3 text-space-dim" />
                <span>{room.buildingCode} • {room.capacity} seats</span>
              </p>
            </div>

            <button
              type="button"
              className="p-1.5 rounded-lg bg-space-sidebar text-space-muted hover:text-white hover:bg-[#222738] transition-colors"
              title="Quick Reserve"
            >
              <ArrowUpRight className="w-4 h-4 text-primary-light" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedSection;
